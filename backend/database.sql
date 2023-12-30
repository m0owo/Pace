CREATE DATABASE pacedb;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE task (
    task_id SERIAL PRIMARY KEY,
    task_description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'To Do',
    completed_at TIMESTAMP
);


