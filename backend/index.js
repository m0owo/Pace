const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()) // allows us to access the req.body


//ROUTES//

//todo
//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        );
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
});

//create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *", 
            [description]
        );
        //newTodo for all info
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.json("Updated")
    } catch (err) {
        console.error(err.message)
    }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

//tasks
//add a task
app.post("/tasks", async (req, res) => {
    try {
        const { task_description } = req.body;
        const newTask = await pool.query(
            "INSERT INTO task (task_description) VALUES ($1) RETURNING *",
            [task_description]
        );
        res.json(newTask.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//edit a task description
app.put("/tasks/:task_id/description", async (req, res) => {
    try {
        const { task_id } = req.params;
        const { task_description } = req.body;

        const editTask = await pool.query(
            "UPDATE task SET task_description = $1 WHERE task_id = $2",
            [task_description, task_id]
        );

        res.json("Edited task description");
    } catch (error) {
        console.error(error.message);
    }
});

// Update task status
app.put("/tasks/:task_id/status", async (req, res) => {
    try {
        const { task_id } = req.params;
        const { status } = req.body;

        if ( status == "Doing" || status == "To Do" ) {
            const editTask = await pool.query(
                "UPDATE task SET status = $1, completed_at = null, WHERE task_id = $2",
                [status, task_id]
            );
        } else if ( status == "Done" ) {
            const editTask = await pool.query(
                "UPDATE task SET status = $1, completed_at = CURRENT_TIMESTAMP WHERE task_id = $2",
                [status, task_id]
            );
        }

        res.json("Edited task status");
    } catch (error) {
        console.error(error.message);
    }
});

//delete a task
app.delete("/tasks/:task_id", async (req, res) => {
    try {
        const { task_id } = req.params;
        const checkTask = await pool.query("SELECT * FROM task WHERE task_id = $1", [task_id]);
        if (checkTask.rows.length > 0) {
            const deleteTask = await pool.query("DELETE FROM task WHERE task_id = $1", [task_id]);
            res.json("Deleted");
        } else {
            res.json("Task not Found")
        }
    } catch (err) {
        console.error(err.message);
    }
});

//get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const allTasks = await pool.query("SELECT * FROM task");
        res.json(allTasks.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get one task
app.get("/tasks/:task_id", async (req, res) => {
    try {
        const { task_id } = req.params;
        const tasks = await pool.query(
            "SELECT * FROM task WHERE task_id = $1",
            [task_id]
        );
        res.json(tasks.rows);
    } catch (error) {
        console.error(error.message);
    }
});



app.listen(3000, () => {
    console.log("Server is starting at port 3000");
});
