const inquirer = require('inquirer'); //Importing the inquirer package
const queries = require('./db/queries'); //Importing the queries module

init();
async function init(){
await start();
}

function start() { //User prompts
  inquirer.prompt([
      {
        name: 'promptInput',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Quit'
        ]
      }
    ])

    .then(answer => {  //Takes answer and calls respective function
      let choice = answer.promptInput;
      switch (choice) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Quit':
          console.log('Application Quit');
          process.exit(0);
      }
    })

    .catch(error => { //Catching and logging errors
      console.error(error);
      process.exit(1);
    });
}
