INSERT INTO departments (name)
VALUES ('Human Resources'),
('Customer Service'),
('Retail'), 
('Marketing');

INSERT INTO job_titles (title, salary, departments_id)
VALUES ('Store Manager', 50000, 3), 
('Store Associate', 20000, 3), 
('HR Manager', 60000, 1), 
('HR Director', 80000, 1), 
('Administrator', 30000, 1),
('Customer Service Agent', 40000, 2),
('Customer Experience Specialist', 60000, 2),
('Marketing Specialist', 18000, 4),
('Marketing Director', 85000, 4),
('Chief Marketing Officer', 100000, 4);

INSERT INTO employees (first_name, last_name, job_titles_id, manager_id)
VALUES ('Al', 'Rich', 10, NULL),
('Sophia', 'Clem', 3, 4),
('Mitch', 'Scoop', 4, NULL),
('Patrick', 'Star', 5, 3),
('Robert', 'Sponge', 9, 10),
('Jill', 'James', 8, 9),
('Griff', 'Ruff', 7, NULL),
('Frodo', 'Bag', 6, 7),
('Chester', 'Cheetah', 1, NULL),
('Minny', 'Mathers', 2, 1);


