// imports inquirer
const inquirer = require('inquirer');
// imports mysql
const mysql = require('mysql2');

// connects to business_db and logs connection msg
const db = mysql.createConnection(
    {
        user: 'root',
        database: 'business_db'
    },
    console.log(`Connected to business database.`)
);

// TODO: create init function to wrap around prompt module so it will come up ea time
const init = () => {
    const questions = inquirer.createPromptModule();
    questions(
        {
            // user will select which list they want to view
            type: 'rawlist',
            name: 'views',
            message: 'Select an option to view data',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees'
            ]
            // console logs response obj in terminal
        }).then((response) => {
            // console.log(response);
            if (response.views === 'View All Departments') {
                db.query('SELECT * FROM departments', (error, departments) => {
                    if (error) console.error(error);
                    // displays query as a table in terminal
                    console.table(departments);
                    init();
                })
            }
            if (response.views === 'View All Roles') {
                db.query('SELECT * FROM job_titles', (error, job_titles) => {
                    if (error) console.error(error);
                    console.table(job_titles);
                    init();
                })
            }
            if (response.views === 'View All Employees') {
                db.query('SELECT * FROM employees', (error, employees) => {
                    if (error) console.error(error);
                    console.table(employees);
                    init();
                })
            }
        })
};

init();

