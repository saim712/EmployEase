const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Create a task (admin only)
router.post('/', verifyToken, taskController.createTask);

// Get list of tasks. Optional query: ?assignedTo=<userId>
router.get('/', verifyToken, taskController.getTasks);

// Get dashboard stats (admin only)
router.get('/stats', verifyToken, taskController.getDashboardStats);
router.get('/employee-stats', verifyToken, taskController.getEmployeeStats);

// Get single task
router.get('/:id', verifyToken, taskController.getTaskById);

// Update task (status, fields) - employees can update status, admins can update all fields
router.patch('/:id', verifyToken, taskController.updateTask);

// Delete task (admin only)
router.delete('/:id', verifyToken, taskController.deleteTask);

module.exports = router;
