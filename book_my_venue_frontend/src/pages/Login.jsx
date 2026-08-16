import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import toast from "react-hot-toast";
import Signup from "../pages/Signup";
import {useAuth} from "../context/AuthContext"
import { login as loginApi } from "../api/authService";

import { login } from "../api/authService";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: saveLogin } = useAuth();
  // const role = location.state?.role || "Venue Owner";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    try {


      const response = await loginApi(
        formData.email,
        formData.password
      );

      const { accessToken, user } = response.data.data;

      saveLogin(user, accessToken);
      // console.log(data.role)
      // Redirect based on role
      switch (user.role) {
        case "ADMIN":
          navigate("/admin");
          break;

        case "VENUE_OWNER":
          navigate("/owner");
          break;

        case "CUSTOMER":
          navigate("/");
          break;

        default:
          navigate("/login");
      }
    } catch (error) {
      // console.log(error)
      // console.log(error.response)
      toast.error(error.response?.data?.message);
      setErrors({
        general: "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <div className="auth-logo">
          <span>🏛️</span>
          <h1>Book My Venue</h1>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h2>Sign In</h2>
            {/* <span className="role-badge">{role}</span> */}
          </div>
          <p className="auth-subtitle">Welcome back! Please enter your credentials.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? "error" : ""}
              />
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>

            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth-link">
            Don't have an account?{" "}
            <Link to="/signup" >Sign up</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
