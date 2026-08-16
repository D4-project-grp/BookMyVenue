import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./RoleSelect.css";

export default function RoleSelect() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!role) return;
    navigate("/login", { state: { role } });
  };

  return (
    <div className="role-select-bg">
      <div className="role-select-container">
        <div className="role-select-logo">
          <span className="logo-icon">🏛️</span>
          <h1>Book My Venue</h1>
          <p>Find & book the perfect venue for your special occasion</p>
        </div>

        <div className="role-select-card">
          <h2>Welcome! Please select your role</h2>
          <p className="role-subtitle">Choose how you'd like to continue</p>

          <div className="role-options">
            <div
              className={`role-option ${role === "Venue Owner" ? "selected" : ""}`}
              onClick={() => setRole("Venue Owner")}
            >
              <span className="role-icon">🏢</span>
              <div>
                <strong>Venue Owner</strong>
                <p>List and manage your venues</p>
              </div>
              <span className="role-check">{role === "Venue Owner" ? "✓" : ""}</span>
            </div>

            <div
              className={`role-option ${role === "Customer" ? "selected" : ""}`}
              onClick={() => setRole("Customer")}
            >
              <span className="role-icon">👤</span>
              <div>
                <strong>Customer</strong>
                <p>Browse and book venues</p>
              </div>
              <span className="role-check">{role === "Customer" ? "✓" : ""}</span>
            </div>

            <div
              className={`role-option ${role === "Admin" ? "selected" : ""}`}
              onClick={() => setRole("Admin")}
            >
              <span className="role-icon">⚙️</span>
              <div>
                <strong>Admin</strong>
                <p>Manage the platform</p>
              </div>
              <span className="role-check">{role === "Admin" ? "✓" : ""}</span>
            </div>
          </div>

          <button
            className="btn-continue"
            onClick={handleContinue}
            disabled={!role}
          >
            Continue as {role || "..."}
          </button>
        </div>
      </div>
    </div>
  );
}
