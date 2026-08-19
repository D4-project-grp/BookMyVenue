import React, { useEffect, useState } from 'react';

import { KPICard } from '../../components/KPICard';
import { getDashboardStats, getAllBookingsForAdmin } from '../../api/adminService';
import './AdminDashboard.css';

export default function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const statsRes = await getDashboardStats();
      setStats(statsRes.data);

      const bookingsRes = await getAllBookingsForAdmin();
      const mapped = (bookingsRes.data || []).map((b) => ({
        id: b.bookingId,
        customer: b.customerName,
        venue: b.venueName,
        startDate: b.startDate,
        cost: b.cost || 0,
        status: b.status,
      }));
      setRecentBookings(mapped.slice(0, 5));
      setLoading(false);
    }
    loadDashboard();
  }, []);

  if (loading || !stats) {
    return (
      <div className="dashboard-container">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const userBreakdown = [
    { type: 'Customers', count: stats.totalCustomers },
    { type: 'Venue Owners', count: stats.totalVenueOwners },
  ];

  const venueStatus = [
    { status: 'Approved', count: stats.approvedVenues },
    { status: 'Pending', count: stats.pendingVenues },
    { status: 'Rejected', count: stats.rejectedVenues },
  ];

  return (
     
     
        <div className="dashboard-container">
          {/* KPI Cards Section */}
          <section className="kpi-section">
            <h2 className="section-title">Platform Overview</h2>
            <div className="kpi-grid">
              <KPICard
                title="Total Users"
                value={stats.totalUsers}
                icon="👥"
              />
              <KPICard
                title="Total Venues"
                value={stats.totalVenues}
                icon="🏢"
              />
              <KPICard
                title="Total Bookings"
                value={stats.totalBookings}
                icon="📅"
              />
              <KPICard
                title="Revenue"
                value={stats.revenue}
                icon="💰"
              />
            </div>
          </section>

          {/* Analytics Section */}
          <section className="analytics-section">
            <div className="analytics-grid">
              {/* User Breakdown */}
              <div className="analytics-card">
                <h3 className="card-title">User Breakdown</h3>
                <div className="breakdown-list">
                  {userBreakdown.map((item, index) => (
                    <div key={index} className="breakdown-item">
                      <span className="breakdown-label">{item.type}</span>
                      <span className="breakdown-value">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Venue Status */}
              <div className="analytics-card">
                <h3 className="card-title">Venue Status</h3>
                <div className="status-list">
                  {venueStatus.map((item, index) => (
                    <div key={index} className="status-item">
                      <span className="status-label">{item.status}</span>
                      <div className="status-bar">
                        <div
                          className={`status-fill ${item.status.toLowerCase()}`}
                          style={{
                            width: `${stats.totalVenues ? (item.count / stats.totalVenues) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="status-count">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Recent Bookings Section */}
          <section className="bookings-section">
            <div className="section-header">
              <h2 className="section-title">Recent Bookings</h2>
              <a href="/admin/bookings" className="view-all-link">
                View All →
              </a>
            </div>

            <div className="table-responsive">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>Cost</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty-row">No bookings yet</td>
                    </tr>
                  ) : (
                    recentBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="booking-id">{booking.id}</td>
                        <td>{booking.customer}</td>
                        <td>{booking.venue}</td>
                        <td>
                          {booking.startDate}
                        </td>
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
          </section>
        </div>
    
     
  );
}