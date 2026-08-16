import React, { useState } from "react";
import { useNavigate } from "react-router";

import VenueForm from "../../components/VenueForm";
import "./AddVenue.css";

export default function AddVenue() {

  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (data) => {

    setSubmitted(true);
    setTimeout(() => navigate("/owner/my-listings"), 1000);
  };

  if (submitted) {
    return (
      <div className="add-venue-success">
        <div className="success-card">
          <span className="success-icon">🎉</span>
          <h2>Listing Submitted!</h2>
          <p>
            Your venue has been submitted for admin approval. You'll be notified once it's live.
          </p>
          <p className="redirect-note">Redirecting to My Listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-venue">
      <div className="page-header">
        <h1 className="page-title">Add New Venue</h1>
        <p className="page-subtitle">
          Fill in all the details to list your venue on Book My Venue. Your listing will be reviewed by our team.
        </p>
      </div>

      <VenueForm onSubmit={handleSubmit} submitLabel="Submit Listing" />
    </div>
  );
}
