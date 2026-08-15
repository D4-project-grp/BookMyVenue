import { useState, useEffect, useMemo } from "react";

import StarRating from "./StarRating";
import "./ReviewSection.css";
import { getAllReviewByVenueId } from "../../api/reviewService";

export default function ReviewSection({ venueId }) {
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!venueId) return;
    let cancelled = false;

    getAllReviewByVenueId(venueId)
      .then((res) => {
        if (cancelled) return;
        const body = res.data;
        if (!body.success) throw new Error(body.message || "Failed to load reviews");
        setReviews(body.data);
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [venueId]);

  const sorted = useMemo(() => {
    const copy = [...reviews];
    copy.sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.createdOn) - new Date(a.createdOn)
        : new Date(a.createdOn) - new Date(b.createdOn)
    );
    return copy;
  }, [reviews, sortBy]);

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  return (
    <div className="review-section">
      <div className="review-header">
        <div>
          <h2>Ratings &amp; Reviews</h2>
          <div className="review-summary">
            <span className="review-avg">★ {avg}</span>
            <span className="review-count">({reviews.length} reviews)</span>
          </div>
        </div>
        <div className="review-actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {loading && <p className="reviews-loading">Loading reviews…</p>}
      {!loading && error && <p className="reviews-error">Couldn't load reviews: {error}</p>}

      {!loading && !error && (
        <div className="review-list">
          {sorted.length === 0 && (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          )}
          {sorted.map((r, i) => (
            <div key={i} className="review-item">
              <div className="review-item-top">
                <div className="review-avatar">{r.name?.[0]?.toUpperCase() || "U"}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-date">{new Date(r.createdOn).toLocaleDateString()}</div>
                </div>
                <StarRating value={r.rating} readOnly size={14} />
              </div>
              <p className="review-note">{r.note}</p>
              {r.images?.length > 0 && (
                <div className="review-photos">
                  {r.images.map((p, j) => (
                    <img key={j} src={p} alt="review" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
