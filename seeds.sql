USE employee_db;

INSERT INTO department (name)
VALUES ("Program Management");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Contracts");

INSERT INTO role (title, salary, department_id)
VALUES ("Program Manager", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Contracts Manager", 65000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rob", "Pecci", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bhaumik", "Patel", 2, 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Lily", "Pham", 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Fernando", "Lucena", 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jacklin", "Mincha", 3);