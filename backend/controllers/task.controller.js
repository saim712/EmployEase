const Task = require('../models/task.model');
const User = require('../models/user.model');

exports.createTask = async (req, res) => {
  try {
    // Only admins can create tasks
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create tasks' });
    }

    const { title, description, assignedTo, dueDate, priority, category } = req.body;
    if (!title || !assignedTo) return res.status(400).json({ message: 'title and assignedTo are required' });

    const task = new Task({
      title,
      description,
      assignedTo,
      dueDate,
      priority,
      category,
      assignedBy: req.user.id // Store the admin ID who created the task
    });

    await task.save();
    const populated = await Task.findById(task._id).populate('assignedTo', 'name email').populate('assignedBy', 'name email');
    res.status(201).json({ message: 'Task created', task: populated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { assignedTo } = req.query;
    const filter = {};

    // If employee, only show their tasks
    if (req.user.role === 'employee') {
      filter.assignedTo = req.user.id;
    } else if (assignedTo) {
      // Admin can filter by assignedTo
      filter.assignedTo = assignedTo;
    }

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email')
      .populate('assignedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('assignedBy', 'name email');

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Employees can only view their own tasks
    if (req.user.role === 'employee' && task.assignedTo._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo');
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Admins can update any field; employees can only update status if assigned to them
    if (req.user.role === 'employee') {
      if (task.assignedTo._id.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      // Employees can only update status and comments
      if (req.body.title || req.body.description || req.body.dueDate || req.body.priority) {
        return res.status(403).json({ message: 'Employees can only update task status' });
      }
    }

    const allowed = req.user.role === 'admin'
      ? ['title', 'description', 'status', 'priority', 'dueDate', 'comments', 'assignedTo', 'category']
      : ['status', 'comments'];

    const updates = {};
    for (const key of Object.keys(req.body)) {
      if (allowed.includes(key)) updates[key] = req.body[key];
    }

    Object.assign(task, updates);
    await task.save();

    const populated = await Task.findById(task._id).populate('assignedTo', 'name email').populate('assignedBy', 'name email');
    res.json({ message: 'Task updated', task: populated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    // Only admins can delete tasks
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete tasks' });
    }

    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const activeTasks = await Task.countDocuments({ status: { $in: ['new', 'active', 'in_progress', 'assigned'] } });
    const failedTasks = await Task.countDocuments({ status: 'failed' });

    res.json({
      totalTasks,
      completedTasks,
      activeTasks,
      failedTasks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEmployeeStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    // Aggregate tasks by assignee
    const stats = await Task.aggregate([
      {
        $group: {
          _id: "$assignedTo",
          total: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
          active: { $sum: { $cond: [{ $in: ["$status", ["assigned", "active", "in_progress"]] }, 1, 0] } },
          new: { $sum: { $cond: [{ $eq: ["$status", "new"] }, 1, 0] } },
          failed: { $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] } }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          name: "$user.name",
          email: "$user.email",
          counts: {
            total: "$total",
            completed: "$completed",
            active: "$active",
            new: "$new",
            failed: "$failed"
          }
        }
      }
    ]);

    // We also want employees with 0 tasks?
    // This aggregation only returns employees with TASKS.
    // For a "perfect" dashboard, we might want ALL employees.
    // But for now, this is a good start.

    res.json({ stats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
