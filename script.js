require("dotenv").config();

const inquirer = require("inquirer");
const mysql = require("mysql");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQLPASS,
  database: "employee_DB",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//Initialization of the app
function init() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message:
        "Would you like to [ADD], [REMOVE], [UPDATE] or [VIEW] employee information?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Remove Employee",
        "Remove Department",
        "Remove Role",
        "Update Employee Role",
        "Update Department",
        "Update Employee Manager",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Departments":
          return viewDept();
        case "View All Roles":
          return viewRoles();
        case "View All Employees":
          return viewEmployees();
        case "View All Employees By Department":
          return viewEmployeesByDept();
        case "View All Employees By Manager":
          return viewEmployeesByMgr();
        case "Add Employee":
          return addEmployee();
        case "Add Department":
          return addDept();
        case "Add Role":
          return addRole();
        case "Remove Employee":
          return removeEmployee();
        case "Remove Department":
          return removeDept();
        case "Remove Role":
          return removeRole();
        case "Update Employee":
          return updateEmployee();
        case "Update Department":
          return updateDept();
        case "Update Role":
          return updateRole();
        case "Exit":
          connection.end();
      }
    });
}

//Callback functions for each prompt
function viewDept() {
  connection.query(
    "SELECT * FROM department",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function viewRoles() {
  connection.query(
    "SELECT * FROM role",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function viewEmployees() {
    connection.query(
      "SELECT * FROM employee ORDER BY last_name",
      function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
      }
    );
  }

function viewEmployeesByDept() {
  connection.query(
    "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY name",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function viewEmployeesByMgr() {
  connection.query(
    "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY title",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function addEmployee() {
  inquirer.prompt(
    {
      name: "firstName",
      type: "input",
      message: "What employee first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What employee last name?",
    }
  );
}

function addRole() {
  inquirer.prompt(
    {
      name: "title",
      type: "input",
      message: "What is the employee's job title?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the employee's yearly salary?",
    }
  );
}

function addDept() {
  inquirer.prompt({
    name: "department",
    type: "input",
    message: "What is the name of the department?",
  });
}

function removeEmployee() {
  inquirer.prompt({
    name: "whichRemove",
    type: "list",
    message: "What would you like to remove?",
    choices: ["Remove Employee", "Remove Department", "Remove Role"],
  });
}

function removeRole() {
  inquirer.prompt({
    name: "whichRemove",
    type: "list",
    message: "What would you like to remove?",
    choices: ["Remove Employee", "Remove Department", "Remove Role"],
  });
}

function removeDept() {
  inquirer.prompt({
    name: "whichRemove",
    type: "list",
    message: "What would you like to remove?",
    choices: ["Remove Employee", "Remove Department", "Remove Role"],
  });
}

function updateEmployee() {
  inquirer.prompt({
    name: "whichUpdate",
    type: "list",
    message: "What employee information would you like to update?",
    choices: [
      "Update Employee Role",
      "Update Department",
      "Update Employee Manager",
    ],
  });
}

function updateRole() {
  inquirer.prompt({
    name: "whichUpdate",
    type: "list",
    message: "What employee information would you like to update?",
    choices: [
      "Update Employee Role",
      "Update Department",
      "Update Employee Manager",
    ],
  });
}

function updateDept() {
  inquirer.prompt({
    name: "whichUpdate",
    type: "list",
    message: "What employee information would you like to update?",
    choices: [
      "Update Employee Role",
      "Update Department",
      "Update Employee Manager",
    ],
  });
}

init();
