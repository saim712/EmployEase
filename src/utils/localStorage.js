const employeesData = [
  {
    id: 1,
    name: "Ali",
    email: "ali@mail.com",
    password: "1234",
    tasks: [
      {
        id: 101,
        title: "Create Landing Page",
        category: "development",
        description: "Build a responsive homepage layout with hero section.",
        status: false
      },
      {
        id: 102,
        title: "Fix Navbar Bug",
        category: "development",
        description: "Resolve overlapping menu issue on mobile screens.",
        status: true
      }
    ]
  },
  {
    id: 2,
    name: "Sara",
    email: "sara@mail.com",
    password: "abcd",
    tasks: [
      {
        id: 103,
        title: "Make UI UX Wireframe",
        category: "design",
        description: "Design dashboard wireframe in Figma.",
        status: false
      },
      {
        id: 104,
        title: "Redesign Login Screen",
        category: "design",
        description: "Improve spacing, layout, and typography.",
        status: true
      }
    ]
  },
  {
    id: 3,
    name: "Usman",
    email: "usman@mail.com",
    password: "1111",
    tasks: [
      {
        id: 105,
        title: "Fix API Integration",
        category: "development",
        description: "Resolve API response delay issues.",
        status: false
      }
    ]
  },
  {
    id: 4,
    name: "Hira",
    email: "hira@mail.com",
    password: "pass",
    tasks: [
      {
        id: 106,
        title: "Design App Logo",
        category: "design",
        description: "Create a minimal logo for the mobile app.",
        status: true
      }
    ]
  },
  {
    id: 5,
    name: "Bilal",
    email: "bilal@mail.com",
    password: "0000",
    tasks: [
      {
        id: 107,
        title: "Penetration Test",
        category: "cyber",
        description: "Run vulnerability scans on admin panel.",
        status: false
      },
      {
        id: 108,
        title: "Check Firewall Rules",
        category: "cyber",
        description: "Review inbound and outbound filter settings.",
        status: true
      }
    ]
  },
  {
    id: 6,
    name: "Zain",
    email: "zain@mail.com",
    password: "z123",
    tasks: [
      {
        id: 109,
        title: "Create Authentication Flow",
        category: "development",
        description: "Implement login, signup, and access logic.",
        status: false
      }
    ]
  },
  {
    id: 7,
    name: "Ayesha",
    email: "ayesha@mail.com",
    password: "321",
    tasks: [
      {
        id: 110,
        title: "Improve Dashboard Layout",
        category: "design",
        description: "Refine spacing and component hierarchy.",
        status: true
      },
      {
        id: 111,
        title: "Color Palette Update",
        category: "design",
        description: "Update UI brand colors to new style guide.",
        status: false
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