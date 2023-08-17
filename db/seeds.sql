INSERT INTO department (id, name)
VALUES (1, "Accounting"),
(2, "Sales"),
(3, "Customer Service"),
(4, "Management");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Accountant", 70000.00, 1),
(2, "Service Representative", 50000.00, 3),
(3, "Salesman", 80000.00, 2),
(4, "Manager", 90000.00, 4),
(5, "CEO", 150000.00, 4);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1, "David", "Wallace", 4),

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "David", "Wallace", 4),
(2, "Michael", "Scott", 5, 1),
(3, "Dwight", "Schrute", 3, 2),
(4, "Kelly", "Kapoor", 2, 2),
(5, "Angela", "Martin", 1, 2);
