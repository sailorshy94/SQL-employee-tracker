USE business_db;

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

INSERT INTO employees (first_name, last_name, job_titles_id, manager_id, manager)
VALUES ('Al', 'Rich', 10, NULL, NULL),
('Mitch', 'Scoop', 4, NULL, NULL),
('Griff', 'Ruffer', 7, NULL, NULL),
('Chester', 'Cheetah', 1, NULL, NULL),
('Minny', 'Mathers', 2, 1, 'Al Rich'),
('Sophia', 'Clem', 3, 2, 'Mitch Scoop'),
('Patrick', 'Star', 5, 2, 'Mitch Scoop'),
('Robert', 'Sponge', 9, 5, 'Minny Mathers'),
('Jill', 'James', 8, 4, 'Chester Cheetah'),
('Frodo', 'Bag', 6, 3, 'Griff Ruffer');


