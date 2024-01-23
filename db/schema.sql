/* will create tables */
DROP DATABASE IF EXISTS business_db;

CREATE DATABASE business_db;

USE business_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (30)
);

CREATE TABLE job_titles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30),
    salary DECIMAL,
    departments_id INT NOT NULL,
    FOREIGN KEY (departments_id)
    REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    job_titles_id INT NOT NULL,
    FOREIGN KEY (job_titles_id)
    REFERENCES job_titles(id),
    /* manager_id is NULL if no manager */
    manager_id INT
    /* FOREIGN KEY (manager_id)  */
    /* REFERENCES employees(id) */
);
