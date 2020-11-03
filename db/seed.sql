USE employeeTables;

INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("R&D");
INSERT into department (name) VALUES ("HR");

INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Salesperson", 80000, 1);
INSERT into role (title, salary, department_id) VALUES ("IT Manager", 100000, 2);
INSERT into role (title, salary, department_id) VALUES ("IT Technician", 80000, 2);
INSERT into role (title, salary, department_id) VALUES ("R&D Manager", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("R&D Manufacturing Engineer", 80000, 3);
INSERT into role (title, salary, department_id) VALUES ("R&D Test Engineer", 80000, 3);
INSERT into role (title, salary, department_id) VALUES ("HR Manager", 100000, 4);
INSERT into role (title, salary, department_id) VALUES ("HR Counselor", 80000, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Erika", "Mustermann", 2, 1);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Fulan", "AlFulani", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jan", "Novak", 4, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Piotr", "Petrov", 5, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Juan", "Perez", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Anna", "Malli", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jean", "Dupont", 8, 5);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Yisrael", "Yisraeli", 9, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Tade", "Deina", 10, 9);