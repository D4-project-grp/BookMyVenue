import { useNavigate, useLocation, Link } from "react-router";
import "./BookingConfirmation.css";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Data is embedded here via navigate(path, { state: { booking } })
  // right after the create-booking API call succeeds.
  const booking = location.state?.booking;

  return (
    <div className="container confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p>Your venue has been successfully booked. A confirmation has been sent to your registered email.</p>

        <div className="confirmation-details">
          <div className="cd-row"><span>Booking ID</span><span>#{booking.bookingId}</span></div>
          <div className="cd-row"><span>Venue</span><span>{booking.venueName}</span></div>
          <div className="cd-row"><span>Status</span><span>{booking.status}</span></div>
          <div className="cd-row"><span>Dates</span><span>{booking.startDate} → {booking.endDate}</span></div>
          <div className="cd-row"><span>Guests</span><span>{booking.noOfGuests}</span></div>
          <div className="cd-row total"><span>Amount paid</span><span>₹{booking.cost}</span></div>
        </div>

        <div className="confirmation-actions">
          <button className="btn-primary" onClick={() => navigate("/customer/bookings/current")}>View My Bookings</button>
          <Link to="/venues" className="btn-primary">Explore More Venues</Link>
        </div>
      </div>
    </div>
  );
}
