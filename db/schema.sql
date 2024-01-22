/* will create tables */
DROP DATABASE IF EXISTS business_db;

CREATE DATABASE business_db;

USE business_db;

SELECT DATABASE();

CREATE TABLE departments (
    id INT NOT NULL AUTO-INCREMENT,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE job_titles (
    id INT NOT NULL AUTO-INCREMENT PRIMARY KEY,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO-INCREEMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    job_title_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (job_titles_id)
    REFERENCES job_titles(id)
    ON DELETE SET NULL,
    /* manager_id is NULL if no manager */
    FOREIGN KEY (manager_id) 
    REFERENCES employees(id),
    PRIMARY KEY (id)
);