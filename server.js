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

// TODO: add prompt module
const questions = inquirer.createPromptModule();
// user will select which list they want to view
questions (
    {
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
        console.log(response);
    });

// TODO: create init function to wrap around prompt module so it will come up ea time

//  TODO: add queries for :
    // view all roles
    // view all depts
    // view all employees