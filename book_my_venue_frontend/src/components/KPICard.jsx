import React from 'react';
import './KPICard.css';

export function KPICard({ title, value, icon, trend }) {
  const formatValue = (val) => {
    if (val >= 100000) {
      return `Rs. ${(val / 100000).toFixed(1)}L`;
    } else if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}K`;
    }
    return val.toString();
  };

  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <h3 className="kpi-title">{title}</h3>
        <span className="kpi-icon">{icon}</span>
      </div>

      <div className="kpi-value">
        {formatValue(value)}
      </div>

      {trend && (
        <div className={`kpi-trend ${trend.direction}`}>
          <span className="trend-icon">
            {trend.direction === 'up' ? '↑' : '↓'}
          </span>
          <span className="trend-text">{trend.percentage}% {trend.direction === 'up' ? 'increase' : 'decrease'}</span>
        </div>
      )}
    </div>
  );
}
