import { Link } from "react-router-dom";
import { db } from "../data/mockData";
import "./BookingsList.css";

export default function BookingsList({ bookings, emptyTitle, emptyText }) {
  if (bookings.length === 0) {
    return (
      <div className="empty-state">
        <h3>{emptyTitle}</h3>
        <p>{emptyText}</p>
        <Link to="/venues" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", marginTop: 12 }}>
          Browse Venues
        </Link>
      </div>
    );
  }

  return (
    <div className="bookings-list">
      {bookings.map((b) => {
        const venue = db.getVenue(b.venue_id);
        return (
          <div key={b.booking_id} className="booking-item">
            <img src={venue?.images?.[0]} alt={venue?.venue_name} />
            <div className="booking-item-body">
              <div className="booking-item-top">
                <h3>{venue?.venue_name || "Venue"}</h3>
                <span className={`booking-status status-${(b.status || "").toLowerCase()}`}>
                  {b.status?.replace("_", " ")}
                </span>
              </div>
              <p className="booking-item-loc">{venue?.locality}, {venue?.city}</p>
              <div className="booking-item-meta">
                <span>🎉 {b.event_type}</span>
                <span>📅 {b.start_date} → {b.end_date}</span>
                <span>👥 {b.no_of_guests} guests</span>
              </div>
            </div>
            <div className="booking-item-price">
              <div>₹{b.cost?.toLocaleString("en-IN")}</div>
              <Link to={`/venue/${b.venue_id}`}>View Venue</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
