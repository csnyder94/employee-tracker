USE employee_db; -- Using employee_db created in schema

INSERT INTO department (name) VALUES -- Inserting department values from walkthrough example
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role (title, department_id, salary) VALUES -- Inserting role values from walkthrough example
  ('Sales Lead', 1, 100000),
  ('Salesperson', 1, 80000),
  ('Lead Engineer', 2, 150000),
  ('Software Engineer', 2, 120000),
  ('Account Manager', 3, 160000),
  ('Accountant', 3, 125000),
  ('Legal Team Lead', 4, 250000),
  ('Lawyer', 4, 190000);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES -- Inserting employee values from walkthrough example
  ('John', 'Doe', 1, NULL),
  ('Mike', 'Chan', 2, 1),
  ('Ashley', 'Rodriguez', 3, NULL),
  ('Kevin', 'Tupik', 4, 3),
  ('Kunal', 'Singh', 5, NULL),
  ('Malia', 'Brown', 6, 5),
  ('Sarah', 'Lourd', 7, NULL),
  ('Tom', 'Allen', 8, 7);