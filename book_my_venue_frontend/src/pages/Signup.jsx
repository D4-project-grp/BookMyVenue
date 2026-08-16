import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import toast from "react-hot-toast";


import "./Auth.css";
import { signup } from "../api/authService";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();



  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
    role: "",
    street: "",
    locality: "",
    city: "",
    pincode: "",
    profileImage: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.password || formData.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (!formData.firstName) errs.firstName = "First name is required";
    if (!formData.lastName) errs.lastName = "Last name is required";
    if (!formData.mobile) errs.mobile = "Mobile number is required";
    if (!formData.role) errs.role = "Role is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    const fd = new FormData();

    fd.append("firstName", formData.firstName);
    fd.append("lastName", formData.lastName);
    fd.append("email", formData.email);
    fd.append("password", formData.password);
    fd.append("mobileNo", formData.mobile);
    fd.append("role", formData.role);

    fd.append("address.street", formData.street);
    fd.append("address.locality", formData.locality);
    fd.append("address.city", formData.city);
    fd.append("address.pincode", formData.pincode);

    fd.append("profileImage", formData.profileImage);
    try {
      const response=await signup(fd);
      // console.log(response.data);
      navigate("/login");
      toast.success("User registered successfully!");
    } catch (err) {
        console.log(err.response)
        toast.error(
            err.response?.data?.message || "Something went wrong."
        );
    }
    finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

   
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    console.log("Selected file:", file);

    setFormData(prev => ({
      ...prev,
      profileImage: file,
    }));
  };
  return (
    <div className="auth-bg">
      <div className="auth-container auth-container-wide">
        <div className="auth-logo">
          <span>🏛️</span>
          <h1>Book My Venue</h1>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>

          </div>
          <p className="auth-subtitle">Fill in the details to get started.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Email Address *</label>
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
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className={errors.password ? "error" : ""}
              />
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mobile No *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 98765-43210"
                  className={errors.mobile ? "error" : ""}
                />
                {errors.mobile && <span className="error-msg">{errors.mobile}</span>}
              </div>
              <div className="form-group">
                <label>Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={errors.role ? "error" : ""}
                >
                  <option value="">Select role</option>
                  <option value="VENUE_OWNER">Venue Owner</option>
                  <option value="CUSTOMER">Customer</option>
                  <option value="ADMIN">Admin</option>
                </select>
                {errors.role && <span className="error-msg">{errors.role}</span>}
              </div>
            </div>

            <div className="form-section-title">Address (Optional)</div>

            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street address"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Locality</label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  placeholder="Locality / Area"
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
              />
            </div>

            <div className="form-group">
              <label>Profile Image</label>
              <div className="file-upload-area">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview-small" />
                ) : (
                  <span className="file-upload-icon">📷</span>
                )}
                <label className="file-upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  {imagePreview ? "Change Photo" : "Choose File"}
                </label>
                <span className="file-name">
                  {formData.profileImage ? formData.profileImage.name : "No file chosen"}
                </span>
              </div>
            </div>

            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="auth-link">
            Already have an account?{" "}
            <Link to="/login" state={{ role: formData.role }}>Sign in</Link>
          </p>

        </div>
      </div>
    </div>
  );
}