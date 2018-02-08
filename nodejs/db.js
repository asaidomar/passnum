const mysql = require('mysql');

con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "NodeDB",
  socketPath : "/Applications/MAMP/tmp/mysql/mysql.sock"
});


con.connect(function(err) {
    if (err) throw err;
});

module.exports = con;