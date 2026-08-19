import React, { useEffect, useState } from 'react';

import { getAllReviewsForAdmin, deleteReviewAsAdmin } from '../../api/adminService';
import './AdminReviews.css';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState('');

  useEffect(() => {
    async function loadReviews() {
      const res = await getAllReviewsForAdmin();
      const mapped = (res.data || []).map((r) => ({
        id: r.reviewId,
        venue: r.venueName,
        customer: r.customerName,
        rating: r.rating,
        text: r.note,
        date: r.createdOn,
      }));
      setReviews(mapped);
      setLoading(false);
    }
    loadReviews();
  }, []);

  const handleDeleteReview = async (id) => {
    await deleteReviewAsAdmin(id);
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const filteredReviews = reviews.filter((review) => {
    if (!filterRating) return true;
    return review.rating === parseInt(filterRating);
  });

  if (loading) {
    return (
      <div className="reviews-page">
        <div className="page-header">
          <h1 className="page-title">Reviews & Ratings</h1>
        </div>
        <p>Loading reviews...</p>
      </div>
    );
  }

  return (
     
        <div className="reviews-page">
          <div className="page-header">
            <h1 className="page-title">Reviews & Ratings</h1>
            <p className="page-subtitle">Manage customer reviews and ratings</p>
          </div>

          <div className="filter-section">
            <label htmlFor="filterRating">Filter by Rating:</label>
            <select
              id="filterRating"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="filter-select"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <span className="filter-count">
              Showing {filteredReviews.length} reviews
            </span>
          </div>

          <div className="reviews-list">
            {filteredReviews.length === 0 ? (
              <p>No reviews found.</p>
            ) : (
              filteredReviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-info">
                      <h4 className="review-venue">{review.venue}</h4>
                      <p className="review-customer">{review.customer}</p>
                    </div>
                    <div className="review-meta">
                      <span className="review-rating">
                        {'⭐'.repeat(review.rating || 0)}
                      </span>
                    </div>
                  </div>

                  <p className="review-text">{review.text}</p>

                  <div className="review-footer">
                    <span className="review-date">
                      {review.date ? new Date(review.date).toLocaleDateString() : ''}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      
  );
}