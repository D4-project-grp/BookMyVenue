import React, { useEffect, useState } from "react";
import { getOwnerOldBookings } from "../../api/bookingService";
import "./Bookings.css";

export default function OldBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchBookings() {
      setLoading(true);
      setLoadError("");
      try {
        const res = await getOwnerOldBookings();
        if (cancelled) return;
        // Normalize backend field names into the shape this component renders.
        const mapped = (res.data.data || []).map((b) => ({
          id: b.bookingId,
          customer: b.customerName,
          mobile: b.customerMobile,
          venue: b.venueName,
          startDate: b.startDate,
          endDate: b.endDate,
          guests: b.noOfGuests,
          cost: b.cost || 0,
          status: b.status,
        }));
        setBookings(mapped);
      } catch (err) {
        if (!cancelled) setLoadError("Could not load past bookings. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBookings();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = bookings.filter(
    (b) =>
      (b.customer || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.venue || "").toLowerCase().includes(search.toLowerCase()) ||
      String(b.id).toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bookings-page">
        <div className="page-header">
          <h1 className="page-title">Old Bookings</h1>
        </div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bookings-page">
        <div className="page-header">
          <h1 className="page-title">Old Bookings</h1>
        </div>
        <p className="form-error">{loadError}</p>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <div className="page-header">
        <h1 className="page-title">Old Bookings</h1>
        <p className="page-subtitle">History of all completed past bookings</p>
      </div>

      {/* Summary cards */}
      <div className="vbooking-summary">
        <div className="summary-card">
          <span className="summary-icon">🗂️</span>
          <div>
            <div className="summary-value">{bookings.length}</div>
            <div className="summary-label">Total Completed</div>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">💰</span>
          <div>
            <div className="summary-value">
              ₹{bookings.reduce((s, b) => s + b.cost, 0).toLocaleString()}
            </div>
            <div className="summary-label">Total Earned</div>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">👥</span>
          <div>
            <div className="summary-value">
              {bookings.reduce((s, b) => s + (b.guests || 0), 0).toLocaleString()}
            </div>
            <div className="summary-label">Total Guests Served</div>
          </div>
        </div>
      </div>

      <div className="bookings-card">
        <div className="bookings-card-header">
          <h2>All Past Bookings</h2>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by customer, venue, or booking ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Mobile</th>
                <th>Venue</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Guests</th>
                <th>Cost (₹)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="10" className="empty-row">
                    {search ? "No bookings match your search." : "No past bookings yet."}
                  </td>
                </tr>
              ) : (
                filtered.map((booking) => (
                  <tr key={booking.id}>
                    <td className="booking-id">{booking.id}</td>
                    <td className="customer-name">{booking.customer}</td>
                    <td className="mobile-no">{booking.mobile}</td>
                    <td>{booking.venue}</td>
                    <td>{booking.startDate}</td>
                    <td>{booking.endDate}</td>
                    <td>{booking.guests}</td>
                    <td className="cost-cell">₹{booking.cost.toLocaleString()}</td>
                    <td>
                      <span className="badge badge-completed">{booking.status}</span>
                    </td>
                    <td>
                      <button
                        className="btn-view-details"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking detail modal */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="booking-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Booking Details</h3>
              <button className="btn-close-modal" onClick={() => setSelectedBooking(null)}>
                ✕
              </button>
            </div>

            <div className="booking-detail-grid">
              <div className="detail-item">
                <span className="detail-label">Booking ID</span>
                <span className="detail-value booking-id">{selectedBooking.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className="badge badge-completed">{selectedBooking.status}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Customer Name</span>
                <span className="detail-value">{selectedBooking.customer}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Mobile</span>
                <span className="detail-value">{selectedBooking.mobile}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Venue</span>
                <span className="detail-value">{selectedBooking.venue}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Number of Guests</span>
                <span className="detail-value">{selectedBooking.guests}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Start Date</span>
                <span className="detail-value">{selectedBooking.startDate}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">End Date</span>
                <span className="detail-value">{selectedBooking.endDate}</span>
              </div>
              <div className="detail-item detail-full">
                <span className="detail-label">Total Cost</span>
                <span className="detail-value cost-highlight">
                  ₹{selectedBooking.cost.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              className="btn-close-full"
              onClick={() => setSelectedBooking(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}