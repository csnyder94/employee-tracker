const mysql = require('mysql2'); //Requiring mysql

const connection = mysql.createConnection({ //Creating connection to mysql
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'employee_db'
});

connection.connect(function (err){ //Console log if an error with connection (most times = password issue)
  if(err) throw err
  console.log(err);
})

module.exports = connection; //Exporting connection