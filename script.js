const inquirer = require("inquirer");

function view() {
    inquirer.prompt(
        {
            name: "whichView",
            type: "list",
            message: "What would you like to view?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "View All Employees By Department", "View All Employees By Manager"]
        }
    );
}

function add() {
    inquirer.prompt(
        {
            name: "whichAdd",
            type: "list",
            message: "What would you like to add?",
            choices: ["Add Employee", "Add Department", "Add Role"]
        }
    );
}

function remove() {
    inquirer.prompt(
        {
            name: "whichRemove",
            type: "list",
            message: "What would you like to remove?",
            choices: ["Remove Employee", "Remove Department", "Remove Role"]
        }
    );
}

function update() {
    inquirer.prompt(
        {
            name: "whichUpdate",
            type: "list",
            message: "What employee information would you like to update?",
            choices: ["Update Employee Role", "Update Department", "Update Employee Manager"]
        }
    );
}

function department() {
    inquirer.prompt(
        {
            name: "department",
            type: "input",
            message: "What is the name of the department?",
        }
    );
}

function employee() {
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
        },
    );
}

function role() {
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
        },
    );
}

function db_init() {
    database().then(function (answer) {

    });
};

function init() {
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "Would you like to [ADD], [REMOVE], [UPDATE] or [VIEW] employee information?",
            choices: ["ADD", "REMOVE", "UPDATE", "VIEW"],
        }
    ).then(function (answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.action === "ADD") {
            add();
        } else if (answer.action === "VIEW") {
            view();
        } else if (answer.action === "UPDATE") {
            update();
        } else if (answer.action === "REMOVE") {
            remove();
        } else {
            connection.end();
        }
    });
}

init();
