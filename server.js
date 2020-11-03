const inquirer = require("inquirer");
let Database = require("./async-db");
let consoleTable = require("console.table");

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Shifting Shadows",
    database: "cms"
  });