import React from "react";
import Footer from "./components/Footer";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

// 🔐 Protected Route
function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
}

function App() {
    const isLoggedIn = localStorage.getItem("token");

    return (
        <Router>
            <div className="app-container">

                <Routes>

                    {/* ✅ Default Route */}
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/signup" />
                        }
                    />

                    {/* ✅ Signup */}
                    <Route
                        path="/signup"
                        element={
                            isLoggedIn ? <Navigate to="/home" /> : <SignUp />
                        }
                    />

                    {/* ✅ Login */}
                    <Route
                        path="/login"
                        element={
                            isLoggedIn ? <Navigate to="/home" /> : <Login />
                        }
                    />

                    {/* 🔐 Protected Home */}
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />

                    {/* Other routes */}
                    <Route path="/about" element={<About />} />

                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;