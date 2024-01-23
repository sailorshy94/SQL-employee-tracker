// imports inquirer
const inquirer = require('inquirer');
// imports mysql
const mysql = require('mysql2');

// connects to business_db
const db = mysql.createConnection(
    {
        host: '',

        user: '',

        password: '',

        database: ''
    },
    console.log(`Connected to business database.`)
);
