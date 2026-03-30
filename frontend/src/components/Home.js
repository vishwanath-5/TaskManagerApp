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

    // 📥 Fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(API, {
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

    // ➕ Add task
    const addTask = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            alert("Please enter title and description");
            return;
        }

        try {
            const res = await axios.post(
                API,
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

    // ❌ Delete task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API}/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

            setTasks(tasks.filter((task) => task._id !== id));
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // ✅ Toggle complete
    const toggleComplete = async (id, completed) => {
        try {
            const res = await axios.put(
                `${API}/${id}`,
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

                        {/* Logo */}
                        <NavLink className="navbar-brand fw-bold" to="/home">
                            Task Manager
                        </NavLink>

                        {/* 🔥 Mobile Toggle Button */}
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarContent"
                            aria-controls="navbarContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* 🔥 Collapsible Content */}
                        <div className="collapse navbar-collapse" id="navbarContent">

                            {/* Left Menu */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/home" className="nav-link">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/about" className="nav-link">
                                        About
                                    </NavLink>
                                </li>
                            </ul>

                            {/* Right Side */}
                            <div className="d-flex flex-column flex-lg-row gap-2">

                                {/* 🔍 Search */}
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search tasks..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                                {/* Search Button */}
                                <button
                                    className="btn btn-outline-success"
                                    type="button"
                                >
                                    Search
                                </button>

                                {/* Logout */}
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
                    <div className="col-md-6 col-lg-4">
                        <form onSubmit={addTask}>
                            <div className="mb-3 text-center">
                                <label className="form-label">Task Title</label>

                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter task"
                                    type="text"
                                    className="form-control"
                                />

                                <input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter description"
                                    type="text"
                                    className="form-control mt-2"
                                />

                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3 w-100"
                                >
                                    Add Task
                                </button>
                            </div>
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
                                <div className="card shadow h-100">
                                    <div className="card-body text-center">
                                        <h5
                                            className={`card-title ${task.completed
                                                ? "text-decoration-line-through text-muted"
                                                : ""
                                                }`}
                                        >
                                            {task.title}
                                        </h5>

                                        <p className="card-text text-muted">
                                            {task.description}
                                        </p>

                                        <button
                                            className={`btn ${task.completed
                                                ? "btn-success"
                                                : "btn-outline-success"
                                                } mt-2`}
                                            onClick={() =>
                                                toggleComplete(task._id, task.completed)
                                            }
                                        >
                                            {task.completed
                                                ? "Completed"
                                                : "Mark Done"}
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