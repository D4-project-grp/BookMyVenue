import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getVenueDetailsByVenueId, getAllAmenities, updateVenue } from "../../api/venueService";
import "./AddVenue.css";

export default function EditVenue() {
  const { venueId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    venueName: "",
    phoneNo: "",
    guestCapacity: "",
    description: "",
    price: "",
    street: "",
    locality: "",
    city: "",
    pincode: "",
    amenityIds: [],
  });
  const [errors, setErrors] = useState({});

  const [amenitiesCatalog, setAmenitiesCatalog] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [venueRes, amenitiesRes] = await Promise.all([
          getVenueDetailsByVenueId(venueId),
          getAllAmenities(),
        ]);
        if (cancelled) return;

        const venue = venueRes.data;
        const catalog = amenitiesRes.data.data || [];
        setAmenitiesCatalog(catalog);

        // the venue details endpoint returns amenity NAMES, not ids -
        // match them back against the catalog to know which checkboxes to pre-select
        const selectedIds = catalog
          .filter((a) => (venue.amenities || []).includes(a.amenityName))
          .map((a) => a.amenityId);

        setFormData({
          venueName: venue.venueName || "",
          phoneNo: venue.phoneNo || "",
          guestCapacity: venue.guestCapacity || "",
          description: venue.description || "",
          price: venue.price || "",
          street: venue.address?.street || "",
          locality: venue.address?.locality || "",
          city: venue.address?.city || "",
          pincode: venue.address?.pincode || "",
          amenityIds: selectedIds,
        });
      } catch (err) {
        if (!cancelled) setLoadError("Could not load this venue. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [venueId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleAmenity = (amenityId) => {
    setFormData((prev) => ({
      ...prev,
      amenityIds: prev.amenityIds.includes(amenityId)
        ? prev.amenityIds.filter((id) => id !== amenityId)
        : [...prev.amenityIds, amenityId],
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.venueName.trim()) errs.venueName = "Venue name is required";
    if (!formData.phoneNo.trim()) errs.phoneNo = "Phone number is required";
    if (!formData.guestCapacity || formData.guestCapacity <= 0) errs.guestCapacity = "Guest capacity is required";
    if (!formData.description.trim()) errs.description = "Description is required";
    if (!formData.price || formData.price <= 0) errs.price = "Price is required";
    if (!formData.street.trim()) errs.street = "Street is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.pincode) errs.pincode = "Pincode is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        venueName: formData.venueName,
        description: formData.description,
        phoneNo: formData.phoneNo,
        price: formData.price,
        guestCapacity: formData.guestCapacity,
        address: {
          street: formData.street,
          locality: formData.locality,
          city: formData.city,
          pincode: formData.pincode ? Number(formData.pincode) : null,
        },
        amenityIds: formData.amenityIds,
      };
      await updateVenue(venueId, payload);
      setSubmitted(true);
      setTimeout(() => navigate("/owner/my-listings"), 1500);
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || "Something went wrong while updating your listing. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="add-venue">
        <p>Loading venue...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="add-venue">
        <div className="page-header">
          <h1 className="page-title">Venue Not Found</h1>
          <p className="page-subtitle">{loadError}</p>
        </div>
        <button
          style={{
            padding: "10px 20px",
            background: "#1a3c6e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
          onClick={() => navigate("/owner/my-listings")}
        >
          ← Back to My Listings
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="add-venue-success">
        <div className="success-card">
          <span className="success-icon">✅</span>
          <h2>Listing Updated!</h2>
          <p>Your venue listing has been updated successfully.</p>
          <p className="redirect-note">Redirecting to My Listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-venue">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            style={{
              padding: "8px 14px",
              background: "#f1f5f9",
              color: "#475569",
              border: "1.5px solid #e2e8f0",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
            }}
            onClick={() => navigate("/owner/my-listings")}
          >
            ← Back
          </button>
          <div>
            <h1 className="page-title">Edit Venue: {formData.venueName}</h1>
            <p className="page-subtitle">
              Update your venue's core details below. Images, food menu, and subscription plan
              aren't editable here yet.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="venue-form">
        <div className="tab-content">
          <div className="form-section-card">
            <h3 className="section-heading">Basic Information</h3>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Venue Name *</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  className={errors.venueName ? "error" : ""}
                />
                {errors.venueName && <span className="error-msg">{errors.venueName}</span>}
              </div>
              <div className="form-group">
                <label>Phone No *</label>
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className={errors.phoneNo ? "error" : ""}
                />
                {errors.phoneNo && <span className="error-msg">{errors.phoneNo}</span>}
              </div>
              <div className="form-group">
                <label>No. of Guests *</label>
                <input
                  type="number"
                  name="guestCapacity"
                  value={formData.guestCapacity}
                  onChange={handleChange}
                  min="1"
                  className={errors.guestCapacity ? "error" : ""}
                />
                {errors.guestCapacity && <span className="error-msg">{errors.guestCapacity}</span>}
              </div>
              <div className="form-group">
                <label>Price (₹ / day) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="1"
                  className={errors.price ? "error" : ""}
                />
                {errors.price && <span className="error-msg">{errors.price}</span>}
              </div>
              <div className="form-group form-full">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={errors.description ? "error" : ""}
                />
                {errors.description && <span className="error-msg">{errors.description}</span>}
              </div>
            </div>
          </div>

          <div className="form-section-card">
            <h3 className="section-heading">Address</h3>
            <div className="form-grid-2">
              <div className="form-group form-full">
                <label>Street *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={errors.street ? "error" : ""}
                />
                {errors.street && <span className="error-msg">{errors.street}</span>}
              </div>
              <div className="form-group">
                <label>Locality</label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? "error" : ""}
                />
                {errors.city && <span className="error-msg">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={errors.pincode ? "error" : ""}
                />
                {errors.pincode && <span className="error-msg">{errors.pincode}</span>}
              </div>
            </div>
          </div>

          <div className="form-section-card">
            <h3 className="section-heading">Amenities</h3>
            <div className="amenities-grid">
              {amenitiesCatalog.map((amenity) => {
                const selected = formData.amenityIds.includes(amenity.amenityId);
                return (
                  <button
                    key={amenity.amenityId}
                    type="button"
                    className={`amenity-btn ${selected ? "amenity-selected" : ""}`}
                    onClick={() => toggleAmenity(amenity.amenityId)}
                  >
                    <span className="amenity-btn-icon">✓</span>
                    <span>{amenity.amenityName}</span>
                    {selected && <span className="amenity-check">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {submitError && <div className="error-msg" style={{ padding: "10px 0" }}>{submitError}</div>}

          <div className="tab-nav-footer">
            <div className="form-submit-actions">
              <button type="submit" className="btn-submit-listing" disabled={submitting}>
                {submitting ? "Saving..." : "💾 Save Changes"}
              </button>
              <button
                type="button"
                className="btn-cancel-form"
                onClick={() => navigate("/owner/my-listings")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}