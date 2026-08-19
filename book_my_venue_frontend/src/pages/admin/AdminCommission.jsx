import React from 'react';
 
import { KPICard } from '../../components/KPICard';
import { mockCommissionData } from '../../lib/mockData';
import './AdminCommission.css';

export default function AdminCommission() {
  return (
   
        <div className="commission-page">
          <div className="page-header">
            <h1 className="page-title">Commission Earned till today</h1>
            <p className="page-subtitle">Track platform commission earnings</p>
          </div>

          <div className="commission-stats">
            <KPICard
              title="Total Commission"
              value={mockCommissionData.totalCommission}
              icon="💰"
            />
            <KPICard
              title="Monthly Commission"
              value={mockCommissionData.monthlyCommission}
              icon="📊"
            />
            <KPICard
              title="Pending Commission"
              value={mockCommissionData.pendingCommission}
              icon="⏳"
            />
          </div>

          <div className="commission-table-section">
            <h2 className="section-title">Commission Transactions</h2>

            <div className="table-responsive">
              <table className="commission-table">
                <thead>
                  <tr>
                    <th>Commission ID</th>
                    <th>Booking ID</th>
                    <th>Venue</th>
                    <th>Booking Amount</th>
                    <th>Commission Rate</th>
                    <th>Commission Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCommissionData.transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="commission-id">{transaction.id}</td>
                      <td>{transaction.bookingId}</td>
                      <td>{transaction.venue}</td>
                      <td>Rs. {transaction.bookingAmount.toLocaleString()}</td>
                      <td>{transaction.commissionRate}%</td>
                      <td className="amount">
                        Rs. {transaction.commissionAmount.toLocaleString()}
                      </td>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
     
  );
}
