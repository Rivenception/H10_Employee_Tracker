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
    .then(function (res) {
      switch (res.action) {
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
    "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY manager_id DESC",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function addEmployee() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What employee first name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What employee last name?",
            },
            {
                type: "list",
                name: "role",
                choices: () => {
                    var choices = [];
                    for(var i=0;i<res.length;i++){
                        choices.push(res[i].title);
                    }
                    return choices;
                }
            }
        ])
        .then(function(answer){
            for(var i=0;i<res.length;i++){
                if(answer.role === res[i].title)
                answer.role = res[i].id;
            }
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role
                },
                init()
            )},
        )
    })
};

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
    choices: () => {},
  });
}

function removeRole() {
  inquirer.prompt({
    name: "whichRemove",
    type: "list",
    message: "What would you like to remove?",
    choices: () => {},
  });
}

function removeDept() {
  inquirer.prompt({
    name: "whichRemove",
    type: "list",
    message: "What would you like to remove?",
    choices: () => {},
  });
}

function updateEmployee() {
  inquirer.prompt({
    name: "whichUpdate",
    type: "list",
    message: "What employee information would you like to update?",
    choices: () => {},
  });
}

function updateRole() {
  inquirer.prompt({
    name: "whichUpdate",
    type: "list",
    message: "What employee information would you like to update?",
    choices: () => {},
  });
}

function updateDept() {
  inquirer.prompt({
    name: "whichUpdate",
    type: "list",
    message: "What employee information would you like to update?",
    choices: () => {},
  })
}

init();
