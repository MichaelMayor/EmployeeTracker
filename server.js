const inquirer = require("inquirer");
let Database = require("./db_constructor");
let consoleTable = require("console.table");

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "M4ssms3ff3ct!",
    database: "employeeTables"
});

async function viewAllEmployees() {
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    console.table(rows);
}

async function viewAllDepartments() {
    let query = "SELECT * FROM department";
    const rows = await db.query(query);
    console.table(rows);
}

async function viewAllRoles() {
    let query = "SELECT * FROM role";
    const rows = await db.query(query);
    console.table(rows);
    return rows;
}

async function viewAllEmployeesByDepartment() {
    let query = "SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
    const rows = await db.query(query);
    console.table(rows);
}

async function main() {
    let exitLoop = false;
    while (!exitLoop) {
        const prompt = await mainPrompt();

        switch (prompt.action) {
            case 'View all employees': {
                await viewAllEmployees();
                break;
            }

            case 'View all departments': {
                await viewAllDepartments();
                break;
            }

            case 'View all employees by department': {
                await viewAllEmployeesByDepartment();
                break;
            }

            case 'View all roles': {
                await viewAllRoles();
                break;
            }

            case 'Add department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break;
            }

            case 'Add employee': {
                const newEmployee = await getAddEmployeeInfo();
                console.log(newEmployee);
                await addEmployee(newEmployee);
                break;
            }

            case 'Add role': {
                const newRole = await getRoleInfo();
                await addRole(newRole);
                break;
            }

            case 'Remove employee': {
                const employee = await getRemoveEmployeeInfo();
                await removeEmployee(employee);
                break;
            }

            case 'Update employee role': {
                const employee = await getUpdateEmployeeRoleInfo();
                await updateEmployeeRole(employee);
                break;
            }

            case 'Exit': {
                exitLoop = true;
                process.exit(0);
            }

            default:
                console.log(`Error. Action was ${prompt.action}`);
        }
    }
};

async function mainPrompt() {
    return inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: [
                "View all employees",
                "View all departments",
                "View all employees by department",
                "View all roles", "Add department",
                "Add employee",
                "Add role",
                "Remove employee",
                "Update employee role",
                "Exit"
            ]
        }])
};

main();