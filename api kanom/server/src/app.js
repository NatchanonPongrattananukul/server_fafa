const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const dbConfig = require("./config/dbConfig");
const dessertsRouter = require("./router/dessertRouter");
const adminRouter = require("./router/adminRouter");
const usersRouter = require("./router/usersRouter");

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database");
});

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dessertsRouter(app, connection);
adminRouter(app, connection);
usersRouter(app, connection);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
