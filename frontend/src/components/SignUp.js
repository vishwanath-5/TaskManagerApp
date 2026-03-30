import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const API = process.env.REACT_APP_API;

    const handleSubmit = async () => {
        try {
            await axios.post(
                `${API}/auth/signup`,
                form
            );

            alert("Signup successful");
            window.location.href = "/login";

        } catch (err) {
            alert(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Signup</h2>

            <input
                className="form-control mt-2"
                placeholder="Name"
                onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                }
            />

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

            <button className="btn btn-success mt-3" onClick={handleSubmit}>
                Signup
            </button>

            {/* 🔥 NEW */}
            <p className="mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-primary fw-bold">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default SignUp;