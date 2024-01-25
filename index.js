//TODO: 
// create lookup table
// create list of functions

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
                'View All Employees',
                'Add new Department',
                // 'Add new Role',
                'Add new Employee',
                // 'Update existing Employee Role',
                'Exit'
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

            if (response.views === 'Add new Department') {
                const prompt = inquirer.createPromptModule();
                prompt({
                    type: 'input',
                    name: 'name',
                    message: 'Please enter a title for new department'
                }).then((answers) => {
                    (console.log(answers))
                    db.query('INSERT INTO departments SET ?', answers, (error) => {
                        if (error) console.error(error);
                        console.log(`New department added to database`);
                        init();
                    })
                })
            }

            // rinse and repeat above
            if (response.views === 'Add new Role') {
                const prompt = inquirer.createPromptModule();
                prompt({
                    type: 'input',
                    name: 'new_role',
                    message: 'Please enter',
                })
                db.query('INSERT ? INTO', (error) => {
                    // if (error) console.error(error);
                    // console.log(`${prompt.new_dept} department added to database`);
                    // init();
                })
            }

            if (response.views === 'Add new Employee') {
                const prompt = inquirer.createPromptModule();
                prompt([{
                    type: 'input',
                    name: 'first_name',
                    message: 'Please enter new employee first name'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Please enter new employee last name'
                }]).then((answers) => {
                    console.log(answers);
                    inquirer.prompt({
                        type: 'input',
                        name: 'title',
                        message: 'Please assign a role for the new employee',
                        choices: [
                            
                        ]
                    })
                })
            }
                // db.query('INSERT ? INTO', (error) => {
                    // if (error) console.error(error);
                    // console.log(`${prompt.new_dept} department added to database`);
                    // init();
            //     })
            // }

            if (response.views === 'Update existing Employee role') {
                const prompt = inquirer.createPromptModule();
                prompt({
                    type: 'input',
                    name: 'update',
                    message: '',
                })
                db.query('INSERT ? INTO', (error) => {
                    // if (error) console.error(error);
                    // console.log(`${prompt.new_dept} department added to database`);
                    // init();
                })
            }

            if (response.views === 'Exit') {
                console.log(`Exiting...bye`);
                process.exit();
            }
        })
};

init();

