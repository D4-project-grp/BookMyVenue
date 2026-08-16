import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

import ImageSlider from "../../components/customer/ImageSlider";
import ReviewSection from "../../components/customer/ReviewSection";
import AmenityIcon from "../../components/customer/AmenityIcon";
import "./VenueDetails.css";
import { getVenueDetailsByVenueId, getAllMenusByVenueId } from "../../api/venueService";
export default function VenueDetails() {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const formatMenuTypeLabel = (menuType) =>
    menuType
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  
  const [venue, setVenue] = useState(null);
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    console.log("Hi")
    async function fetchData() {
      const response = await getVenueDetailsByVenueId(venueId);
      const menuResponse = await getAllMenusByVenueId(venueId);

      setVenue(response.data)
      setMenu(menuResponse.data)
      console.log(response.data)
      console.log(menuResponse.data)
      //   const [venueData, reviewsData] = await Promise.all([
      //     getVenueDetailsByVenueId(venueId),
      //     getReviewsByVenueId(venueId)
      // ]);

      // setVenue(venueData);
      // setReviews(reviewsData);


    }
    fetchData()

  }, [])
  const currentUser=sessionStorage.getItem("user")
  // useEffect(()=>{

  //      VenueDetails();

  // },[venue])
  if (!venue) {

    return (
      <div className="empty-state">
        <h3>Venue not found</h3>
        <button className="btn-outline" onClick={() => navigate("/venues")}>Back to venues</button>
      </div>
    );
  }


  // const reviews = db.getReviewsForVenue(venue.venue_id);
  // const avgRating = reviews.length
  //   ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
  //   : null;

  const handleBookNow = () => {
   
    if (!currentUser) {
      navigate("/login", { state: { from: { pathname: `/booking/${venue.venueId}` } } });
      return;
    }
    navigate(`/booking/${venue.venueId}`);
  };

  return (
    <div className="container venue-details">
      <ImageSlider images={venue.venue_images} />

      <div className="venue-details-layout">
        <div className="venue-details-main">
          <div className="vd-title-row">
            <div>
              <h1>{venue.venueName}</h1>
              <p className="vd-location">📍 {venue.address.street}, {venue.address.locality}, {venue.address.city} - {venue.address.pincode}</p>
            </div>
            {/* {avgRating && (
              <div className="vd-rating-badge">
                <span>★ {avgRating}</span>
                <small>{reviews.length} reviews</small>
              </div>
            )} */}
          </div>

          <div className="vd-stats">
            <div className="vd-stat">
              <strong>{venue.guestCapacity}</strong>
              <span>Guest capacity</span>
            </div>
            <div className="vd-stat">
              <strong>₹{venue.price.toLocaleString("en-IN")}</strong>
              <span>Starting price / day</span>
            </div>
            <div className="vd-stat">
              {/* real per-date availability is checked on the booking page instead;
                  this endpoint doesn't return a status field to check here */}
              <strong>Available</strong>
              <span>Current status</span>
            </div>
          </div>



          <section className="vd-section">
            <h2>Amenities</h2>

            <div className="amenities-grid">

              {(!venue.amenities || venue.amenities.length === 0) &&
                <p className="no-reviews">
                  No amenities listed.
                </p>
              }

              {venue.amenities?.map((amenity, key) => (
                <div key={key} className="amenity-chip">
                  <AmenityIcon name={amenity} />
                  {amenity}
                </div>
              ))}

            </div>
          </section>

          <section className="vd-section">
            <div className="vd-section-head">
              <h2>Food Menu</h2>
              <button className="btn-primary" onClick={handleBookNow}>Select Items &amp; Book</button>
            </div>

            {menu && menu
              .filter((group) => group.items.length > 0)
              .map((group) => (
                <div key={group.menuType} className="menu-preview-group">
                  <h4>{formatMenuTypeLabel(group.menuType)}</h4>
                  <div className="food-grid">
                    {group.items.slice(0, 4).map((f, idx) => (
                      <div key={idx} className="food-item">
                        <img
                          src={`${f.imgUrl}`}
                          alt={f.foodName}
                        />
                        <div>
                          <div className="food-name">
                            <span className={`veg-dot ${f.foodType === "VEG" ? "veg" : "nonveg"}`} />
                            {f.foodName}
                          </div>
                          <div className="food-type">{f.foodType === "VEG" ? "Veg" : "Non-Veg"}</div>
                        </div>
                        {/* <div className="food-price">₹{f.price}</div> */}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </section>

          <section className="vd-section">
            <h2>Location</h2>
            <div className="map-placeholder">
              🗺️ {venue.locality}, {venue.city} — Map view
            </div>
          </section>

          <ReviewSection venueId={venue.venueId} />
        </div>

        <aside className="vd-sidebar">
          <div className="booking-card">
            <div className="booking-price">
              ₹{venue.price.toLocaleString("en-IN")} <small>/ day</small>
            </div>
            <p className="booking-hint">Free cancellation up to 7 days before the event.</p>
            <button className="btn-primary booking-cta" onClick={handleBookNow}>
              Book This Venue
            </button>
            <p className="booking-note">You won't be charged yet.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}