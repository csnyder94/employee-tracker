DROP DATABASE IF EXISTS employee_db; -- Drops the database if it already exists
CREATE DATABASE employee_db; -- Creates the database

USE employee_db; -- Uses the employee database

CREATE TABLE department ( -- Creates department table inside employee database
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role ( -- Creates role table inside employee database and links through primary key
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) 
  REFERENCES department(id)
);

CREATE TABLE employee ( -- Creates employee table inside employee database and links through two primary keys
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) 
  REFERENCES role(id),
  FOREIGN KEY (manager_id) 
  REFERENCES employee(id)
);
