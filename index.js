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

function viewDepartments(){   //Viewing departments function
  queries.viewAllDepartments()
    .then(([rows]) => {
      let departments = rows
      console.table(departments)
    })
    .then(()=> start())
}

function viewRoles(){  //Viewing roles function
  queries.viewAllRoles()
    .then(([rows]) => {
      let roles = rows
      console.table(roles)
    })
    .then(()=> start())
}

function viewEmployees(){  //Viewing Employees function
  queries.viewAllEmployees()
    .then(([rows]) => {
      let employees = rows
      console.table(employees)
    })
    .then(()=> start())
}

function addDepartment() {  //Adding new department with prompt inputs function
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      let name = answer;
      queries
        .createDepartment(name)
        .then(() => console.log("Added new department"))
        .then(() => start());
    });
}

function addRole(){ //Adding new role with prompt inputs function

  queries.viewAllDepartments() //Query to view departments for departmentChoice input
  .then(([rows])=> {
    let departments = rows;
    const departmentChoice = departments.map(({id, name})=> ({ //Creating departmentChoice inputs
      name: name,
      value: id,
    }))

    inquirer.prompt([ //User prompts
      {
        name: 'title',
        message: 'What is the name of the role?',
      },
      {
        name: 'salary',
        message: 'What is the salary of the role?',
      },
      {
        type: 'list',
        name: 'department_id',
        message:'Which department does this role belong to?',
        choices: departmentChoice
      }
    ])

    .then (role => {
      queries.createRole(role)
      .then(()=> console.log("Added new role"))
      .then (()=> start())
    })
  })

}

function addEmployee() { //Adding new employee with prompt inputs function

    queries.viewAllRoles().then(([rows]) => {  //Query to view roles for roleChoices
    let roles = rows; 
    const roleChoices = roles.map(({ id, title }) => ({ //Creating roleChoices inputs
      name: title, 
      value: id,
    }));

    queries.viewAllEmployees().then(([rows]) => { //Query to view managers for managerChoices
      let employees = rows;
      const managerChoices = employees.map( //Creating managerChoices inputs
        ({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
      );
      
      inquirer.prompt([ //Prompt user to enter employee details
          {
            name: "first_name",
            message: "What is the first name of the employee?",
          },
          {
            name: "last_name",
            message: "What is the last name of the employee?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the role of the employee?",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          },
        ])

        .then((employee) => {
          queries
            .createEmployee(employee)
            .then(() => console.log("Added new employee"))
            .then(() => start());
        });
    });
  });
}

function updateEmployeeRole() { //Updating employee role with input prompts

  queries.viewAllEmployees().then(([rows]) => { //Query to view employees for employeeChoices
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({ //Creating employeeChoices inputs
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    queries.viewAllRoles().then(([rows]) => { //Query to view all roles for roleChoices
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({ //Creating roleChoices inputs
        name: title,
        value: id,
      }));

    inquirer.prompt([ //Prompt user to select choices
        {
          type: "list",
          name: "employee_id",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices,
        },
      ])

      .then((employee) => {
        let employeeId = employee.employee_id;

          inquirer.prompt([ //Prompt user to select choices
              {
                type: "list",
                name: "role_id",
                message: "Which role do you want to assign to the employee?",
                choices: roleChoices,
              },
            ])

            .then((role) => { 
              let roleId = role.role_id;

              queries
                .updateEmployeeRole(employeeId, roleId)
                .then(() => console.log("Employee role updated."))
                .then(() => start());
            });
        });
      });
  });
}