import React from "react";
import { NavLink } from "react-router-dom";
function About() {
    return (
        <div className="container mt-5">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Task Manager</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active fw-bold text-primary"
                                            : "nav-link"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active fw-bold text-primary"
                                            : "nav-link"
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="container mt-5">
                <div className="accordion" id="accordionExample">

                    {/* About */}
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#about"
                            >
                                About Task Manager
                            </button>
                        </h2>

                        <div
                            id="about"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body text-center">
                                <p className="text-muted">
                                    A simple and powerful app to manage your daily tasks efficiently.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#features"
                            >
                                Features
                            </button>
                        </h2>

                        <div
                            id="features"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                <ul>
                                    <li>Add tasks with title and description</li>
                                    <li>Mark tasks as completed</li>
                                    <li>Delete tasks</li>
                                    <li>Clean and responsive UI using Bootstrap</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#tech"
                            >
                                Technologies Used
                            </button>
                        </h2>

                        <div
                            id="tech"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                <ul>
                                    <li>Frontend: React.js</li>
                                    <li>Backend: Node.js & Express</li>
                                    <li>Database: MongoDB</li>
                                    <li>Styling: Bootstrap</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Developer */}
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#developer"
                            >
                                Developer
                            </button>
                        </h2>

                        <div
                            id="developer"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body text-center">
                                <p>
                                    This project is developed as part of learning full-stack development
                                    using the MERN stack.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className="fw-bold">
                            Made with Love using MERN Stack
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
