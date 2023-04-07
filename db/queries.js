const connection = require("./connection"); //Require connection to database

class DB { //Setting up class to perform query operations
  constructor(connection) {
    this.connection = connection;
  }

  viewAllDepartments = () =>    //Viewing all departments function runs this query
    this.connection.promise().query(`
      SELECT
        department.id,
        department.name
      FROM
        department
    `);

  viewAllRoles = () =>    //Viewing all roles function runs this query
    this.connection.promise().query(`
      SELECT
        role.id,
        role.title,
        department.name AS department,
        role.salary
      FROM
        role
        LEFT JOIN department ON role.department_id = department.id
    `);

  viewAllEmployees = () =>  //Viewing all employees function runs this query
    this.connection.promise().query(`
      SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM
        employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id;
    `);

  createDepartment = (department) => //Adding a department function runs this query
    this.connection.promise().query("INSERT INTO department SET ?", department);

  createRole = (role) => //Adding a role function runs this query
    this.connection.promise().query("INSERT INTO role SET ?", role);

  createEmployee = (employee) => //Adding an employee function runs this query
    this.connection.promise().query("INSERT INTO employee SET ?", employee);

  updateEmployeeRole = (employeeId, roleId) =>  //Updating an employee's role function runs this query
    this.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    ); 

    viewAllManagers(employeeId) {   //Find all managers function runs this query to choose manager when creating new employee
  return this.connection.promise().query(
    `SELECT 
    DISTINCT e.id, 
    e.first_name, 
    e.last_name FROM employee e WHERE e.id != ? AND e.id = e.manager_id`,
    employeeId
  );
 }
}

module.exports = new DB(connection); //Exporting this class out