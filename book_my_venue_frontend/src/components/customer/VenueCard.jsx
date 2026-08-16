import { useNavigate } from "react-router";
 
import "./VenueCard.css";

export default function VenueCard({ venue }) {
  const navigate = useNavigate();
  // const reviews = db.getReviewsForVenue(venue.venue_id);
  // const avgRating = reviews.length
  //   ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
  //   : null;

  return (
    <div className="venue-card" onClick={() => navigate(`/venue/${venue.venueId}`)}>
      <div className="venue-card-img">
        <img src={venue.img_url} alt={venue.venueName} loading="lazy" />
        {/* {avgRating && (
          <span className="venue-card-rating">
            ★ {avgRating}
          </span>
        )} */}
      </div>
      <div className="venue-card-body">
        <h3>{venue.venueName}</h3>
        <p className="venue-card-loc">{venue.locality}, {venue.city}</p>
        <div className="venue-card-meta">
          <span>👥 Up to {venue.guestCapacity} guests</span>
        </div>
        <div className="venue-card-footer">
          <span className="venue-card-price">₹{venue.price.toLocaleString("en-IN")}<small>/day</small></span>
          <button
            className="venue-card-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/venue/${venue.venueId}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}