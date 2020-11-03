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

async function addEmployee(employeeInfo) {
    let roleId = await getRoleId(employeeInfo.role);
    let managerId = await getEmployeeId(employeeInfo.manager);
    let query = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    let args = [employeeInfo.first_name, employeeInfo.last_name, roleId, managerId];
    const rows = await db.query(query, args);
    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
}

async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = 'INSERT into department (name) VALUES (?)';
    let args = [departmentName];
    const rows = await db.query(query, args);
    console.log(`Added department named ${departmentName}`);
}

async function addRole(roleInfo) {
    const departmentId = await getDepartmentId(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = 'INSERT into role (title, salary, department_id) VALUES (?,?,?)';
    let args = [title, salary, departmentId];
    const rows = await db.query(query, args);
    console.log(`Added role ${title}`);
}

async function getDepartmentId(departmentName) {
    let query = "SELECT * FROM department WHERE department.name=?";
    let args = [departmentName];
    const rows = await db.query(query, args);
    return rows[0].id;
}

async function getRoleId(roleName) {
    let query = "SELECT * FROM role WHERE role.title=?";
    let args = [roleName];
    const rows = await db.query(query, args);
    return rows[0].id;
}

async function getEmployeeId(fullName) {
    const employee = fullName.split(" ");
    let query = 'SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?';
    let args = [employee[0], employee[1]];
    const rows = await db.query(query, args);
    return rows[0].id;
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

            case 'View all roles': {
                await viewAllRoles();
                break;
            }

            case 'Add employee': {
                const newEmployee = await getAddEmployeeInfo();
                console.log(newEmployee);
                await addEmployee(newEmployee);
                break;
            }

            case 'Add department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break;
            }

            case 'Add role': {
                const newRole = await getRoleInfo();
                await addRole(newRole);
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
                "View all roles",
                "Add department",
                "Add employee",
                "Add role",
                "Update employee role",
                "Exit"
            ]
        }])
};

async function getAddEmployeeInfo() {
    const managers = await getManagerNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: [
                    ...managers
                ]
            }
        ])
}

async function getDepartmentInfo() {
    return inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
        }
    ])
}

async function getRoleInfo() {
    const departments = await getDepartmentNames();
    return inquirer
    .prompt([
        {
            type: "input",
            message: "What is the title of the new role?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary of the new role?",
            name: "salary"
        },
        {
            type: "list",
            message: "Which department uses this role?",
            name: "departmentName",
            choices: [
                ...departments
            ]
        }
    ])
}

async function getUpdateEmployeeRoleInfo() {
    const employees = await getEmployeeNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to update?",
                name: "employeeName",
                choices: [
                    ...employees
                ]
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "role",
                choices: [
                    ...roles
                ]
            }
        ])

}
main();