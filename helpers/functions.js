const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'business_db'
    },
    console.log(`Connected to the classlist_db database.`)
);


function employees() {
    db.query('SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee', function (err, results) {
        console.log(results)
        let currentEmployees = results;
        module.exports = currentEmployees
    })
}


