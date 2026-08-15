import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router";
 
import "./Navbar.css";

import { useAuth } from "../../context/AuthContext";

const CITIES = ["Pune", "Mumbai", "Nashik", "Nagpur", "Delhi", "Bengaluru"];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(localStorage.getItem("vb_city") || "Pune");
  const [cityOpen, setCityOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  
  const currentUser = user; // Use the user from AuthContext
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/venues?search=${encodeURIComponent(query)}`);
  };

  const selectCity = (c) => {
    setCity(c);
//     localStorage.setItem("vb_city", c);
    setCityOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          venue<span>vista</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search for venues, banquet halls, lawns..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="navbar-city">
          <button type="button" onClick={() => setCityOpen((o) => !o)} className="city-btn">
            {city}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {cityOpen && (
            <div className="city-dropdown">
              {CITIES.map((c) => (
                <div key={c} className="city-option" onClick={() => selectCity(c)}>
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-user" ref={menuRef}>
            <button className="user-btn" onClick={() => setMenuOpen((o) => !o)}>
              <div className="user-avatar">{currentUser.firstName?.[0]?.toUpperCase() || "U"}</div>
              <span>{currentUser.firstName}</span>
            </button>
            {menuOpen && (
              <div className="user-dropdown">
                <Link to="/customer/profile" onClick={() => setMenuOpen(false)}>My Profile</Link>
                <Link to="/customer/bookings/current" onClick={() => setMenuOpen(false)}>Current Bookings</Link>
                <Link to="/customer/bookings/history" onClick={() => setMenuOpen(false)}>Booking History</Link>
                <button
                  className="logout-btn"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                    navigate("/");
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="signin-btn" onClick={() => navigate("/login")}>
            Sign in
          </button>
        )}
      </div>

       
    </header>
  );
}
