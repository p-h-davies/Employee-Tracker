//Importing packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
// const n = require('inquirer');


//Mysql Connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
);


//Inquirer questions 
function questions() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Welcome! What would you like to do?',
                name: 'choice',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
            },
        ])
        //Node responses
        .then((responses) => {
            if (responses.choice == 'view all departments') {
                db.query('SELECT * FROM department', function (err, results) {
                    //show departments and restart questions
                    console.table(results);
                    questions()
                });
            } else if (responses.choice == 'view all roles') {
                db.query('SELECT * FROM role', function (err, results) {
                    //show roles and restart questions
                    console.table(results);
                    questions()
                });
            } else if (responses.choice == 'view all employees') {
                db.query('SELECT * FROM employee', function (err, results) {
                    //show employees and restart questions
                    console.table(results);
                    questions()
                });
                //Add a department:
            } else if (responses.choice == 'add a department') {
                //ask questions
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the name of the new department?',
                        name: 'name',
                    },
                    {
                        type: 'input',
                        message: 'Give this department an ID number.',
                        name: 'id',
                    },
                ])
                    //Add department into db
                    .then((responses) => {
                        db.query(`INSERT INTO department (name, id) VALUES ("${responses.name}", ${responses.id})`);
                        console.log('**Updated department list!**')
                        questions()
                    });
            }
            //Add a role:
            else if (responses.choice == 'add a role') {
                //Get departments from db
                db.query('SELECT id AS value, name FROM department', function (err, results) {
                    let currentDepartments = results
                    //Ask Questions
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What is the name of the role?',
                            name: 'name',
                        },
                        {
                            type: 'input',
                            message: 'What is the salary? Numbers only.',
                            name: 'salary',
                        },
                        {
                            type: 'list',
                            message: 'What department does it fall under?',
                            name: 'dep',
                            choices: currentDepartments
                        }
                    ])
                        //Add role into db
                        .then((responses) => {
                            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${responses.name}", ${responses.salary}, ${responses.dep})`);
                            console.log('**Updated role!**')
                            questions()
                        });
                })
                //Add an employee
            } else if (responses.choice == 'add an employee') {
                //Get employees from db
                db.query('SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee', function (err, results) {
                    let currentEmployees = results
                    //Get roles from db
                    db.query('SELECT id AS value, title AS name FROM role', function (err, results) {
                        let currentRoles = results
                        //Ask questions
                        inquirer.prompt([
                            {
                                type: 'input',
                                message: 'What is the first name of the employee?',
                                name: 'firstName',
                            },
                            {
                                type: 'input',
                                message: 'What is the last name of the employee?',
                                name: 'lastName',
                            },
                            {
                                type: 'list',
                                message: 'What will their role be?',
                                name: 'role',
                                choices: currentRoles
                            },
                            {
                                type: 'list',
                                message: 'Who will be their manager?',
                                name: 'manager',
                                choices: currentEmployees
                            }
                        ])
                            //Add employee in db
                            .then((responses) => {
                                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${responses.firstName}", "${responses.lastName}", ${responses.role}, ${responses.manager})`);
                                console.log('**Employee Added**');
                                questions()
                            });
                    })
                })
                //Update employee role
            } else if (responses.choice == 'update an employee role') {
                //Get employees from db
                db.query('SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee', function (err, results) {
                    let currentEmployees = results
                    //Get roles from db
                    db.query('SELECT id AS value, title AS name FROM role', function (err, results) {
                        let currentRoles = results
                        //Ask questions
                        inquirer.prompt([
                            {
                                type: 'list',
                                message: 'Who is the employee?',
                                name: 'employee',
                                choices: currentEmployees
                            },
                            {
                                type: 'list',
                                message: 'What will their role be?',
                                name: 'role',
                                choices: currentRoles
                            },
                        ])
                            //Update employee role in db
                            .then((responses) => {
                                db.query(`UPDATE employee SET role_id = ${responses.role} WHERE id = ${responses.employee}`);
                                console.log('**Employee role updated**')
                                questions()
                            });
                    })
                })
            }
        }
        );
}

questions()