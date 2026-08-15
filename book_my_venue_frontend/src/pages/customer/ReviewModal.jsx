import React, { useState } from "react";
import toast from "react-hot-toast";
import { submitReview } from "../../api/reviewService";
import "./ReviewModal.css";
 
export default function ReviewModal({ booking, onClose, onSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [note, setNote] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setImageFiles((prev) => [...prev, ...files]);
    // allow re-selecting the same file(s) again later
    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (rating < 1) {
      toast.error("Please select a star rating.");
      return;
    }

    const formData = new FormData();
    formData.append("bookingId", booking.id);
    formData.append("rating", rating);
    formData.append("note", note);
    
    imageFiles.forEach((file) => formData.append("images", file));

    setSubmitting(true);
    try {
      await submitReview(formData);
      toast.success("Review submitted. Thank you!");
      onSubmitted?.(booking.id);
      onClose();
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || "Could not submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="review-modal" onClick={(e) => e.stopPropagation()}>
        <div className="review-modal-header">
          <div>
            <h3>Leave a Review</h3>
            <p className="review-modal-subtitle">{booking.venue}</p>
          </div>
          <button className="btn-close-modal" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="review-modal-body">
          <label className="review-field-label">Your rating</label>
          <div className="star-picker">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="star-btn"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
              >
                {star <= (hoverRating || rating) ? "★" : "☆"}
              </button>
            ))}
          </div>

          <label className="review-field-label" htmlFor="review-note">Your review</label>
          <textarea
            id="review-note"
            className="review-textarea"
            placeholder="Share your experience about this venue..."
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <label className="review-field-label">Add photos (optional)</label>
          <div className="review-photo-row">
            <label className="btn-choose-file">
              Choose Files
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                hidden
              />
            </label>
            <span className="review-file-name">
              {imageFiles.length > 0
                ? `${imageFiles.length} file${imageFiles.length > 1 ? "s" : ""} selected`
                : "No files chosen"}
            </span>
          </div>

          {imageFiles.length > 0 && (
            <ul className="review-file-list">
              {imageFiles.map((file, index) => (
                <li key={`${file.name}-${index}`} className="review-file-item">
                  <span className="review-file-item-name">{file.name}</span>
                  <button
                    type="button"
                    className="btn-remove-file"
                    onClick={() => handleRemoveImage(index)}
                    aria-label={`Remove ${file.name}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            className="btn-submit-review"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit review"}
          </button>
        </div>
      </div>
    </div>
  );
}
