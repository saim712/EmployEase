const employeesData = [
  {
    id: 1,
    name: "Ali",
    email: "ali@mail.com",
    password: "1234",
    taskCount: {
      active: 1,
      failed: 0,
      completed: 1,
      newTask: 1 
    },
    tasks: [
      {
        id: 101,
        taskTitle: "Create Landing Page",
        category: "Development",
        taskDescription: "Build a responsive homepage layout with hero section.",
        taskDate: "2025-12-15",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        id: 102,
        taskTitle: "Fix Navbar Bug",
        category: "Development",
        taskDescription: "Resolve overlapping menu issue on mobile screens.",
        taskDate: "2025-12-14",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      }
    ]
  },
  {
    id: 2,
    name: "Sara",
    email: "sara@mail.com",
    password: "abcd",
    taskCount: {
      active: 1,
      failed: 0,
      completed: 1,
      newTask: 1
    },
    tasks: [
      {
        id: 103,
        taskTitle: "Make UI UX Wireframe",
        category: "Design",
        taskDescription: "Design dashboard wireframe in Figma.",
        taskDate: "2025-12-13",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        id: 104,
        taskTitle: "Redesign Login Screen",
        category: "Design",
        taskDescription: "Improve spacing, layout, and typography.",
        taskDate: "2025-12-12",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      }
    ]
  },
  {
    id: 3,
    name: "Usman",
    email: "usman@mail.com",
    password: "1111",
    taskCount: {
      active: 1,
      failed: 0,
      completed: 0,
      newTask: 1
    },
    tasks: [
      {
        id: 105,
        taskTitle: "Fix API Integration",
        category: "Development",
        taskDescription: "Resolve API response delay issues.",
        taskDate: "2025-12-11",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      }
    ]
  },
  {
    id: 4,
    name: "Hira",
    email: "hira@mail.com",
    password: "pass",
    taskCount: {
      active: 0,
      failed: 0,
      completed: 1,
      newTask: 0
    },
    tasks: [
      {
        id: 106,
        taskTitle: "Design App Logo",
        category: "Design",
        taskDescription: "Create a minimal logo for the mobile app.",
        taskDate: "2025-12-10",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      }
    ]
  },
  {
    id: 5,
    name: "Bilal",
    email: "bilal@mail.com",
    password: "0000",
    taskCount: {
      active: 1,
      failed: 0,
      completed: 1,
      newTask: 1
    },
    tasks: [
      {
        id: 107,
        taskTitle: "Penetration Test",
        category: "Cyber",
        taskDescription: "Run vulnerability scans on admin panel.",
        taskDate: "2025-12-09",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        id: 108,
        taskTitle: "Check Firewall Rules",
        category: "Cyber",
        taskDescription: "Review inbound and outbound filter settings.",
        taskDate: "2025-12-08",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      }
    ]
  },
  {
    id: 6,
    name: "Zain",
    email: "zain@mail.com",
    password: "z123",
    taskCount: {
      active: 1,
      failed: 0,
      completed: 0,
      newTask: 1
    },
    tasks: [
      {
        id: 109,
        taskTitle: "Create Authentication Flow",
        category: "Development",
        taskDescription: "Implement login, signup, and access logic.",
        taskDate: "2025-12-07",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      }
    ]
  },
  {
    id: 7,
    name: "Ayesha",
    email: "ayesha@mail.com",
    password: "321",
    taskCount: {
      active: 1,
      failed: 0,
      completed: 1,
      newTask: 1
    },
    tasks: [
      {
        id: 110,
        taskTitle: "Improve Dashboard Layout",
        category: "Design",
        taskDescription: "Refine spacing and component hierarchy.",
        taskDate: "2025-12-06",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        id: 111,
        taskTitle: "Color Palette Update",
        category: "Design",
        taskDescription: "Update UI brand colors to new style guide.",
        taskDate: "2025-12-05",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      }
    ]
  }
];



const adminData = [
  {
    id: 1,
    email: "admin@gmail.com",
    password: 123
  }
];



export const setEmployeeData=()=>{
    localStorage.setItem("employeesData",JSON.stringify(employeesData));
}
export const setAdminData=()=>{
    localStorage.setItem("adminData",JSON.stringify(adminData))
    
}
export const getEmployeeData=()=>{
    let employeeData=JSON.parse(localStorage.getItem("employeesData"))
    return employeeData?employeeData:null;
}
export const getAdminData=()=>{
    let adminData=JSON.parse(localStorage.getItem(adminData))
    return adminData?adminData:null;
}