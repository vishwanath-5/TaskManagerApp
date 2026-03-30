import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const API = process.env.REACT_APP_API;

function Home() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");

    // 🔐 Redirect if not logged in   
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/signup";
        }
    }, []);

    // 📥 Fetch tasks ✅ FIXED
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`${API}/tasks`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setTasks(res.data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchTasks();
    }, []);

    // ➕ Add task (already correct)
    const addTask = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            alert("Please enter title and description");
            return;
        }

        try {
            const res = await axios.post(
                `${API}/tasks`,
                { title, description, completed: false },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            setTasks([...tasks, res.data]);
            setTitle("");
            setDescription("");
        } catch (err) {
            console.error("Add error:", err);
        }
    };

    // ❌ Delete task ✅ FIXED
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API}/tasks/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

            setTasks(tasks.filter((task) => task._id !== id));
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // ✅ Toggle complete ✅ FIXED
    const toggleComplete = async (id, completed) => {
        try {
            const res = await axios.put(
                `${API}/tasks/${id}`,
                { completed: !completed },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            setTasks(
                tasks.map((task) =>
                    task._id === id ? res.data : task
                )
            );
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    // 🔍 Search filter
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {/* 🔝 Navbar */}
            <div className="container mt-5">
                <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary shadow-sm">
                    <div className="container-fluid">

                        <NavLink className="navbar-brand fw-bold" to="/home">
                            Task Manager
                        </NavLink>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarContent"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarContent">

                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <NavLink to="/home" className="nav-link">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/about" className="nav-link">About</NavLink>
                                </li>
                            </ul>

                            <div className="d-flex gap-2">

                                <input
                                    className="form-control"
                                    placeholder="Search tasks..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        window.location.href = "/signup";
                                    }}
                                >
                                    Logout
                                </button>

                            </div>
                        </div>
                    </div>
                </nav>

                {/* ➕ Add Task */}
                <div className="row justify-content-center mt-4">
                    <div className="col-md-6">
                        <form onSubmit={addTask}>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Task title"
                                className="form-control"
                            />

                            <input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="form-control mt-2"
                            />

                            <button className="btn btn-primary mt-3 w-100">
                                Add Task
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* 📋 Task List */}
            <div className="container mt-4">
                <div className="row">
                    {filteredTasks.length === 0 ? (
                        <p className="text-center">No tasks found</p>
                    ) : (
                        filteredTasks.map((task) => (
                            <div className="col-md-4 mb-4" key={task._id}>
                                <div className="card shadow">
                                    <div className="card-body text-center">

                                        <h5 className={task.completed ? "text-decoration-line-through text-muted" : ""}>
                                            {task.title}
                                        </h5>

                                        <p className="text-muted">{task.description}</p>

                                        <button
                                            className="btn btn-success mt-2"
                                            onClick={() =>
                                                toggleComplete(task._id, task.completed)
                                            }
                                        >
                                            {task.completed ? "Completed" : "Mark Done"}
                                        </button>

                                        <button
                                            className="btn btn-danger mt-2 ms-2"
                                            onClick={() => deleteTask(task._id)}
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;