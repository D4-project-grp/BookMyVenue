import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
 
import "./Layout.css"
import { useAuth } from "../context/AuthContext";
export default function VenueOwnerLayout() {
  const { user, logout } = useAuth();
  const currentUser=user;
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = currentUser
    ? `${currentUser.firstName?.[0] || ""}${currentUser.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  const navItems = [
    { to: "/owner", label: "Dashboard", icon: "📊" },
    { to: "/owner/my-listings", label: "My Listings", icon: "🏢" },
    { to: "/owner/add-venue", label: "+ Add Venue", icon: "➕" },
    { to: "/owner/bookings/current-bookings", label: "Current Bookings", icon: "📅" },
    { to: "/owner/bookings/old-bookings", label: "Old Bookings", icon: "🗂️" },
    { to: "/owner/edit-profile", label: "Edit Profile", icon: "👤" },
  ];

  return (
    <div className="layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-logo">
          <span>🏛️</span>
          <span className="sidebar-logo-text">Book My Venue</span>
        </div>

        <div className="sidebar-portal-label">Venue Owner Portal</div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-info">
            <div className="sidebar-avatar">{initials}</div>
            <div>
              <div className="sidebar-user-name">
                {currentUser?.firstName} {currentUser?.lastName}
              </div>
              <div className="sidebar-user-role">Venue Owner</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="main-wrapper">
        {/* Header */}
        <header className="header">
          <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="header-title">Venue Owner Portal</div>
          <div className="header-right">
            <div className="header-avatar">{initials}</div>
            <span className="header-username">
              {currentUser?.firstName} {currentUser?.lastName}
            </span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

       
        <Outlet/>
      </div>
    </div>
  );
}
