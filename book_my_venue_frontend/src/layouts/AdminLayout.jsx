import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import "./Layout.css"

export default function AdminLayout() {
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
     { label: 'Dashboard', to: '/admin/dashboard', icon: '📊' },
    //{ label: 'Manage Users', path: '/admin/users', icon: '👥' },
    { label: 'All Venues', to: '/admin/venues', icon: '🏢' },
    { label: 'All Bookings', to: '/admin/bookings', icon: '📅' },
    { label: 'Reviews & Ratings', to: '/admin/reviews', icon: '⭐' },
    { label: 'Payment Transactions', to: '/admin/payments', icon: '💳' },
    { label: 'Commission Earned', to: '/admin/commission', icon: '💰' },
    { label: 'Edit Profile', to: '/admin/profile', icon: '👤' },
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

        <div className="sidebar-portal-label">Admin Portal</div>

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
          <div className="header-title">Admin Portal</div>
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

        {/* Page content */}
        {/* <main className="main-content">{children}</main> */}
        <Outlet/>
      </div>
    </div>
  );
}
