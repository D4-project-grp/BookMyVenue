import React from 'react';
 
import { mockPaymentTransactions } from '../../lib/mockData';
import './AdminPayments.css';

export default function AdminPayments() {
  return (
     
        <div className="payments-page">
          <div className="page-header">
            <h1 className="page-title">Payment Transactions</h1>
            <p className="page-subtitle">View all payment records</p>
          </div>

          <div className="table-responsive">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {mockPaymentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="transaction-id">{transaction.id}</td>
                    <td>{transaction.bookingId}</td>
                    <td>{transaction.customer}</td>
                    <td className="amount">Rs. {transaction.amount.toLocaleString()}</td>
                    <td>{transaction.method}</td>
                    <td>
                      <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
       
  );
}
