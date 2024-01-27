
// imports inquirer
const inquirer = require('inquirer');
// imports mysql
const mysql = require('mysql2');

function doSomething() {

}
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
                'Add new Role',
                'Add new Employee',
                // 'Update existing Employee Role',
                'Exit']
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


            if (response.views === 'Add new Role') {
                const prompt = inquirer.createPromptModule();
                db.query('SELECT * FROM departments', (error, departments) => {
                    if (error) console.error(error);
                    console.log(departments);
                    const departmentChoices = departments.map(({ id, name }) => ({
                        name: name,
                        value: id
                    }))
                    prompt([{
                        type: 'input',
                        name: 'title',
                        message: 'Please enter title of new role'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Please enter salary for new role'
                    },
                    {
                        type: 'rawlist',
                        name: 'departments_id',
                        message: 'Please enter department for new role',
                        choices: departmentChoices
                    }]
                    ).then((answers) => {
                        (console.log(answers))
                        db.query('INSERT INTO job_titles SET ?', answers, (error) => {
                            if (error) console.error(error);
                            init();
                        })
                    })
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
                    const firstName = answers.first_name;
                    const lastName = answers.last_name;

                    db.query('SELECT * FROM job_titles', (error, job_titles) => {
                        if (error) console.error(error);
                        console.log(job_titles);
                        const jobTitleChoices = job_titles.map(({ id, title }) => ({
                            name: title,
                            value: id
                        }))
                        inquirer.prompt({
                            type: 'rawlist',
                            name: 'title',
                            message: 'Please assign a role for the new employee',
                            choices: jobTitleChoices
                        }).then((results) => {
                            const role = results.title;

                            db.query('SELECT * FROM employees', (error, employees) => {
                                if (error) console.error(error);
                                console.log(employees);
                                const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                                    name: `${first_name} ${last_name}`,
                                    value: id
                                }))
                                inquirer.prompt({
                                    type: 'rawlist',
                                    name: 'title',
                                    message: 'Please assign a manager for the new employee',
                                    choices: employeeChoices
                                }
                                ).then((data) => {
                                    let employee = { 
                                        manager_id: data.title,
                                        job_titles_id: role,
                                        first_name: firstName,
                                        last_name: lastName
                                    }
                                    console.log(results);
                                    db.query('INSERT INTO employees SET ?', employee, (error, employees) => {
                                        if (error) console.error(error);
                                        console.log(employee);
                                        init();
                                    })
                                })
                            })
                        })
                    })
                })
            }

            // if (response.views === 'Update existing Employee role') {
            //     const prompt = inquirer.createPromptModule();
            //     prompt({
            //         type: 'input',
            //         name: 'update',
            //         message: '',
            //     })
            //     db.query('INSERT ? INTO', (error) => {
            //         // if (error) console.error(error);
            //         // console.log(`${prompt.new_dept} department added to database`);
            //         // init();
            //     })
            // }

            if (response.views === 'Exit') {
                console.log(`Exiting...bye`);
                process.exit();
            }
        })
};

init();

