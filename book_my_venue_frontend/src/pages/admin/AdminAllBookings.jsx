import React, { useEffect, useState } from 'react';

import { getAllBookingsForAdmin } from '../../api/adminService';
import './AdminAllBookings.css';

// backend sends "CONFIRMED", this page's filter/badges expect "Confirmed"
const toTitleCase = (status) =>
  status ? status.charAt(0) + status.slice(1).toLowerCase() : status;

export default function AdminAllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    async function loadBookings() {
      const res = await getAllBookingsForAdmin();
      const mapped = (res.data || []).map((b) => ({
        id: b.bookingId,
        customer: b.customerName,
        mobile: b.customerMobile,
        venue: b.venueName,
        owner: b.venueOwnerName,
        startDate: b.startDate,
        endDate: b.endDate,
        guests: b.noOfGuests,
        cost: b.cost || 0,
        status: toTitleCase(b.status),
      }));
      setBookings(mapped);
      setLoading(false);
    }
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchStatus = !filterStatus || booking.status === filterStatus;
    const matchSearch = !searchId || String(booking.id).includes(searchId.toUpperCase());
    return matchStatus && matchSearch;
  });

  if (loading) {
    return (
      <div className="bookings-page">
        <div className="page-header">
          <h1 className="page-title">All Bookings</h1>
        </div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
     
        <div className="bookings-page">
          <div className="page-header">
            <h1 className="page-title">All Bookings</h1>
            <p className="page-subtitle">Manage and view all venue bookings</p>
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label htmlFor="searchId">Search Booking ID:</label>
              <input
                id="searchId"
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter booking ID..."
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="filterStatus">Filter by Status:</label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="filter-info">
              Showing {filteredBookings.length} bookings
            </div>
          </div>

          <div className="table-responsive">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Mobile</th>
                  <th>Venue</th>
                  <th>Owner</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Guests</th>
                  <th>Cost</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="empty-row">No bookings found.</td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="booking-id">{booking.id}</td>
                      <td>{booking.customer}</td>
                      <td>{booking.mobile}</td>
                      <td>{booking.venue}</td>
                      <td>{booking.owner}</td>
                      <td>{booking.startDate}</td>
                      <td>{booking.endDate}</td>
                      <td>{booking.guests}</td>
                      <td className="cost">Rs. {booking.cost.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      
  );
}