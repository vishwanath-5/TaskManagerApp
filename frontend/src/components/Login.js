import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const API = process.env.REACT_APP_API;
    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${API}/auth/login`,
                form
            );

            localStorage.setItem("token", res.data.token);
            window.location.href = "/home";

        } catch (err) {
            alert(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Login</h2>

            <input
                className="form-control mt-2"
                placeholder="Email"
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
            />

            <input
                className="form-control mt-2"
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

            <button className="btn btn-primary mt-3" onClick={handleLogin}>
                Login
            </button>

            {/* 🔥 NEW */}
            <p className="mt-3">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-primary fw-bold">
                    Signup
                </Link>
            </p>
        </div>
    );
}

export default Login;