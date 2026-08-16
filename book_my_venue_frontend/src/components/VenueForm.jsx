import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./VenueForm.css";
import { getAllAmenities,getSubscriptionPackages,addVenue } from "../api/venueService";
// Base URL for your Spring Boot backend — adjust to match your setup
// (e.g. via .env: VITE_API_BASE_URL=http://localhost:8080)
 

 
const DEFAULT_FOOD_CATEGORIES = [
  { category: "Welcome Drinks", items: [{ name: "", price: "", description:"",image: null, imageFile: null,imageKey: crypto.randomUUID() }] },
  { category: "Welcome Snacks Starters", items: [{ name: "", price: "", description:"", image: null, imageFile: null,imageKey: crypto.randomUUID() }] },
  { category: "Main Course Vegetarian", items: [{ name: "", price: "", description:"",image: null, imageFile: null,imageKey: crypto.randomUUID() }] },
  { category: "Main Course Non Vegetarian", items: [{ name: "", price: "", description:"", image: null, imageFile: null,imageKey: crypto.randomUUID() }] },
  { category: "Dessert", items: [{ name: "", price: "", description:"", image: null, imageFile: null ,imageKey: crypto.randomUUID()}] },
];

export default function VenueForm({ initialData, onSubmit, submitLabel = "Submit Listing" }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    guests: initialData?.guests || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    street: initialData?.street || "",
    locality: initialData?.locality || "",
    city: initialData?.city || "",
    pincode: initialData?.pincode || "",
    amenities: initialData?.amenities || [],
    package: initialData?.package || "",
    images: initialData?.images || [],
    foodMenu: initialData?.foodMenu || DEFAULT_FOOD_CATEGORIES,
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(initialData?.images || []);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  // --- Amenities & packages come from the backend, not hardcoded ---
  const [amenitiesCatalog, setAmenitiesCatalog] = useState([]);
  const [amenitiesLoading, setAmenitiesLoading] = useState(true);
  const [amenitiesError, setAmenitiesError] = useState("");

  const [packagesCatalog, setPackagesCatalog] = useState([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [packagesError, setPackagesError] = useState("");

  useEffect(() => {
    let cancelled = false;

    getAllAmenities()
      .then((res) => {
        if (cancelled) return;
        // ApiResponse<List<Amenity>> -> { success, message, data, timestamp }
        setAmenitiesCatalog(res.data.data || []);
      })
      .catch(() => {
        if (!cancelled) setAmenitiesError("Couldn't load amenities. Please retry.");
      })
      .finally(() => {
        if (!cancelled) setAmenitiesLoading(false);
      });

    getSubscriptionPackages()
      .then((res) => {
        if (cancelled) return;
        console.log(res.data.data)
        setPackagesCatalog(res.data.data || []);
      })
      .catch(() => {
        if (!cancelled) setPackagesError("Couldn't load subscription plans. Please retry.");
      })
      .finally(() => {
        if (!cancelled) setPackagesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleAmenity = (amenityId) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = [...imageFiles, ...files].slice(0, 6);
    setImageFiles(newFiles);
    const previews = newFiles.map((f) => URL.createObjectURL(f));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  // Category-level field (currently just the category name)
  const handleFoodCategoryChange = (catIndex, field, value) => {
    const updated = formData.foodMenu.map((item, i) =>
      i === catIndex ? { ...item, [field]: value } : item
    );
    setFormData((prev) => ({ ...prev, foodMenu: updated }));
  };




  // Individual food item fields (name / price), scoped within a category
  const handleFoodItemChange = (catIndex, itemIndex, field, value) => {
    setFormData((prev) => {
      const foodMenu = [...prev.foodMenu];
      const items = [...foodMenu[catIndex].items];
      items[itemIndex] = { ...items[itemIndex], [field]: value };
      foodMenu[catIndex] = { ...foodMenu[catIndex], items };
      return { ...prev, foodMenu };
    });
  };

  const addFoodItem = (catIndex) => {
    setFormData((prev) => {
      const foodMenu = [...prev.foodMenu];
      foodMenu[catIndex] = {
        ...foodMenu[catIndex],
        items: [...foodMenu[catIndex].items, { name: "", price: "",description: "", image: null,imageFile:null,
          imageKey: crypto.randomUUID() }],
      };
      return { ...prev, foodMenu };
    });
  };

  const removeFoodItem = (catIndex, itemIndex) => {
    setFormData((prev) => {
      const foodMenu = [...prev.foodMenu];
      const remaining = foodMenu[catIndex].items.filter((_, i) => i !== itemIndex);
      foodMenu[catIndex] = {
        ...foodMenu[catIndex],
        items: remaining.length ? remaining : [{ name: "", price: "",description: "", image: null,imageFile:null,imageKey:crypto.randomUUID(), }],
      };
      return { ...prev, foodMenu };
    });
  };

  // Food item image — a food item has exactly one photo (food_items -> image, 1-to-1)
  const handleFoodItemImageUpload = (catIndex, itemIndex, fileList) => {
    const file = Array.from(fileList || []).find((f) => f.type.startsWith("image/"));
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setFormData((prev) => {
        const foodMenu = [...prev.foodMenu];
        const items = [...foodMenu[catIndex].items];
        // `image` = preview (data URL) shown in the thumbnail
        // `imageFile` = the real File object that actually gets uploaded
        items[itemIndex] = { ...items[itemIndex], image: dataUrl, imageFile: file };
        foodMenu[catIndex] = { ...foodMenu[catIndex], items };
        return { ...prev, foodMenu };
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFoodItemImage = (catIndex, itemIndex) => {
    setFormData((prev) => {
      const foodMenu = [...prev.foodMenu];
      const items = [...foodMenu[catIndex].items];
      items[itemIndex] = { ...items[itemIndex], image: null, imageFile: null };
      foodMenu[catIndex] = { ...foodMenu[catIndex], items };
      return { ...prev, foodMenu };
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Venue name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.guests || formData.guests <= 0) errs.guests = "Number of guests is required";
    if (!formData.description.trim()) errs.description = "Description is required";
    if (!formData.price || formData.price <= 0) errs.price = "Price is required";
    if (!formData.street.trim()) errs.street = "Street is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.pincode.trim()) errs.pincode = "Pincode is required";
    if (!formData.package) errs.package = "Please select a listing package";
    return errs;
  };

  const buildVenueFormData = () => {
    const fd = new FormData();

    
    const payload = {
      venueName: formData.name,
      phoneNo: formData.phone,
      guestCapacity: formData.guests,
      description: formData.description,
      price: formData.price,
      address: {
        street: formData.street,
        locality: formData.locality,
        city: formData.city,
        // Address.pincode is Integer on the backend — form inputs give you
        // a string, so convert it (Number("") is 0, not NaN, so guard for that).
        pincode: formData.pincode ? Number(formData.pincode) : null
      }
      ,
      amenityIds: formData.amenities, // array of amenity_id
      packageId: formData.package, // selected subscription package id
      foodMenu: formData.foodMenu.map((category) => ({
        category: category.category,
        items: category.items
          .filter((item) => item.name.trim()) // skip empty rows
          .map((item) => ({
            name: item.name,
            price: item.price,
            description:item.description, 
            imageKey:item.imageKey,
            hasImage: Boolean(item.imageFile),
          })),
      })),
    };
    console.log("Food menu before sending:");
    console.log(JSON.stringify(payload.foodMenu, null, 2));
    fd.append("data", new Blob([JSON.stringify(payload)], { type: "application/json" }));

    // 2. Venue images (multiple)
    imageFiles.forEach((file) => {
      fd.append("venueImages", file);
    });

    
   
    formData.foodMenu.forEach((category) => {

      category.items.forEach((item) => {
    
        if(item.imageFile){
    
          fd.append(
            item.imageKey,
            item.imageFile
          );
    
        }
    
      });
    
    });
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Switch to the tab with errors
      if (errs.name || errs.phone || errs.guests || errs.description || errs.price || errs.street || errs.city || errs.pincode) {
        setActiveTab("basic");
      } else if (errs.package) {
        setActiveTab("package");
      }
      return;
    }

    setLoading(true);
    try {
      const fd = buildVenueFormData();
      // const res = await axios.post(`${API_BASE_URL}/api/venue/listing`, fd);
      const res=await addVenue(fd);
      // Don't set a Content-Type header manually — axios/the browser sets
      // the correct "multipart/form-data; boundary=..." automatically when
      // the body is a FormData instance. Setting it yourself without a
      // boundary breaks multipart parsing on the backend.

      if (onSubmit) {
        onSubmit(res.data.data);
      } else {
        navigate("/owner/my-listings");
      }
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || "Something went wrong while creating your listing. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="venue-form">
      {/* Tab navigation */}
      <div className="form-tabs">
        {[
          { key: "basic", label: "📋 Basic Info" },
          { key: "images", label: "🖼️ Images" },
          { key: "amenities", label: "✅ Amenities" },
          { key: "food", label: "🍽️ Food Menu" },
          { key: "package", label: "📦 Package" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`form-tab ${activeTab === tab.key ? "form-tab-active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Basic Info Tab ─── */}
      {activeTab === "basic" && (
        <div className="tab-content">
          <div className="form-section-card">
            <h3 className="section-heading">Basic Information</h3>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Venue Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Mahal Banquet Hall"
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Phone No *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765-43210"
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>No. of Guests *</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  min="1"
                  className={errors.guests ? "error" : ""}
                />
                {errors.guests && <span className="error-msg">{errors.guests}</span>}
              </div>
              <div className="form-group">
                <label>Price (₹ / day) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
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
                  placeholder="Describe your venue — features, atmosphere, ideal events..."
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
                  placeholder="Street address"
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
                  placeholder="Locality / Area"
                />
              </div>
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
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
                  placeholder="Pincode"
                  className={errors.pincode ? "error" : ""}
                />
                {errors.pincode && <span className="error-msg">{errors.pincode}</span>}
              </div>
            </div>
          </div>

          <div className="tab-nav-footer">
            <button type="button" className="btn-next" onClick={() => setActiveTab("images")}>
              Next: Images →
            </button>
          </div>
        </div>
      )}

      {/* ─── Images Tab ─── */}
      {activeTab === "images" && (
        <div className="tab-content">
          <div className="form-section-card">
            <h3 className="section-heading">Venue Images</h3>
            <p className="section-note">Upload up to 6 photos of your venue (JPG, PNG). Good photos attract more bookings!</p>

            <label className="image-upload-zone">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <span className="upload-icon">📸</span>
              <span className="upload-text">Click to upload venue photos</span>
              <span className="upload-hint">JPG, PNG — up to 6 images</span>
            </label>

            {imagePreviews.length > 0 && (
              <div className="image-grid">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={src} alt={`Venue ${index + 1}`} />
                    <button
                      type="button"
                      className="btn-remove-image"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </button>
                    {index === 0 && <span className="primary-badge">Main</span>}
                  </div>
                ))}
              </div>
            )}

            {imagePreviews.length === 0 && (
              <div className="no-images-hint">
                <span>🖼️</span>
                <p>No images uploaded yet. Add photos to make your listing stand out!</p>
              </div>
            )}
          </div>

          <div className="tab-nav-footer">
            <button type="button" className="btn-back" onClick={() => setActiveTab("basic")}>
              ← Back
            </button>
            <button type="button" className="btn-next" onClick={() => setActiveTab("amenities")}>
              Next: Amenities →
            </button>
          </div>
        </div>
      )}

      {/* ─── Amenities Tab ─── */}
      {activeTab === "amenities" && (
        <div className="tab-content">
          <div className="form-section-card">
            <h3 className="section-heading">Select Amenities</h3>
            <p className="section-note">Choose all amenities available at your venue.</p>

            {amenitiesLoading && <p className="section-note">Loading amenities…</p>}
            {amenitiesError && <p className="error-msg">{amenitiesError}</p>}

            {!amenitiesLoading && !amenitiesError && (
              <div className="amenities-grid">
                {amenitiesCatalog.map((amenity) => {
                  // Adjust these field names if your Amenity entity serializes
                  // differently — console.log(amenitiesCatalog) once to confirm.
                  const id = amenity.amenityId ?? amenity.id;
                  const name = amenity.amenityName ?? amenity.name;
                  const logo = amenity.logoImg;
                  const selected = formData.amenities.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      className={`amenity-btn ${selected ? "amenity-selected" : ""}`}
                      onClick={() => toggleAmenity(id)}
                    >
                      {logo ? (
                        <img src={logo} alt="" className="amenity-btn-logo" style={{ width: 18, height: 18 }} />
                      ) : (
                        <span className="amenity-btn-icon">✓</span>
                      )}
                      <span>{name}</span>
                      {selected && <span className="amenity-check">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {formData.amenities.length > 0 && (
              <div className="selected-amenities">
                <strong>Selected ({formData.amenities.length}):</strong>{" "}
                {amenitiesCatalog
                  .filter((a) => formData.amenities.includes(a.amenityId ?? a.id))
                  .map((a) => a.amenityName ?? a.name)
                  .join(", ")}
              </div>
            )}
          </div>

          <div className="tab-nav-footer">
            <button type="button" className="btn-back" onClick={() => setActiveTab("images")}>
              ← Back
            </button>
            <button type="button" className="btn-next" onClick={() => setActiveTab("food")}>
              Next: Food Menu →
            </button>
          </div>
        </div>
      )}

      {/* ─── Food Menu Tab ─── */}
      {activeTab === "food" && (
        <div className="tab-content">
          <div className="form-section-card">
            <h3 className="section-heading">Food Menu</h3>
            <p className="section-note">
              Add your food menu details for banquets, weddings, and parties. Add items under each category, with photos for each dish.
            </p>

            <div className="food-menu-list">
              {formData.foodMenu.map((category, catIndex) => (
                <div key={catIndex} className="food-menu-item">
                  <div className="food-menu-header">
                    <input
                      type="text"
                      value={category.category}
                      readOnly
                      onChange={(e) => handleFoodCategoryChange(catIndex, "category", e.target.value)}
                      placeholder="Category (e.g. Starters)"
                      className="food-category-input"
                    />

                  </div>

                  <div className="food-item-list">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="food-item-card">
                        <div className="food-item-row">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleFoodItemChange(catIndex, itemIndex, "name", e.target.value)}
                            placeholder="Item name (e.g. Paneer Tikka)"
                            className="food-item-name-input"
                          />
                          <input
                            type="number"
                            min="0"
                            value={item.price}
                            onChange={(e) => handleFoodItemChange(catIndex, itemIndex, "price", e.target.value)}
                            placeholder="Price"
                            className="food-item-price-input"
                          />
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleFoodItemChange(catIndex, itemIndex, "description", e.target.value)}
                            placeholder="Description"
                            className="food-item-description-input"
                          />
                          {category.items.length > 1 && (
                            <button
                              type="button"
                              className="btn-remove-item"
                              onClick={() => removeFoodItem(catIndex, itemIndex)}
                              aria-label="Remove item"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        <div className="food-item-images">
                          {item.image ? (
                            <div className="food-image-thumb">
                              <img src={item.image} alt={item.name || "Food item"} />
                              <button
                                type="button"
                                className="food-image-remove"
                                onClick={() => removeFoodItemImage(catIndex, itemIndex)}
                                aria-label="Remove image"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <label className="food-image-upload">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  handleFoodItemImageUpload(catIndex, itemIndex, e.target.files);
                                  e.target.value = "";
                                }}
                                hidden
                              />
                              <span className="food-image-upload-icon">+</span>
                              <span className="food-image-upload-label">Add photo</span>
                            </label>
                          )}
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn-add-item"
                      onClick={() => addFoodItem(catIndex)}
                    >
                      + Add Item
                    </button>
                  </div>
                </div>
              ))}
            </div>


          </div>

          <div className="tab-nav-footer">
            <button type="button" className="btn-back" onClick={() => setActiveTab("amenities")}>
              ← Back
            </button>
            <button type="button" className="btn-next" onClick={() => setActiveTab("package")}>
              Next: Package →
            </button>
          </div>
        </div>
      )}

      {/* ─── Package Tab ─── */}
      {activeTab === "package" && (
        <div className="tab-content">
          <div className="form-section-card">
            <h3 className="section-heading">Listing Package</h3>
            <p className="section-note">
              Choose a subscription plan. Commission is paid to the platform per confirmed booking as per the selected plan.
            </p>

            {packagesLoading && <p className="section-note">Loading subscription plans…</p>}
            {packagesError && <p className="error-msg">{packagesError}</p>}

            {!packagesLoading && !packagesError && (
              <div className="packages-grid">
                {packagesCatalog.map((pkg) => {
                  // Adjust these field names to match SubscriptionPackageResponse's
                  // actual JSON — console.log(packagesCatalog) once to confirm.
                  const id = pkg.packageId;
                  const title = pkg.packageName ?? pkg.title;
                  const price = pkg.subscriptionAmount
                    ;
                  const commission = pkg.bookingDiscountPercentage != null
                    ? `${pkg.bookingDiscountPercentage}% commission per booking`
                    : pkg.commission;
                  const desc = pkg.description ?? pkg.desc;
                  const selected = formData.package === id;
                  return (
                    <div
                      key={id}
                      className={`package-card ${selected ? "package-selected" : ""}`}
                      onClick={() => setFormData((prev) => ({ ...prev, package: id }))}
                    >
                      <div className="package-header">
                        <h4>{title}</h4>
                        {selected && <span className="package-check">✓ Selected</span>}
                      </div>
                      <div className="package-price">₹{price}</div>
                      <div className="package-commission">
                        <span className="commission-badge">{commission}</span>
                      </div>
                      <p className="package-desc">{desc}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {errors.package && (
              <span className="error-msg" style={{ marginTop: "8px", display: "block" }}>
                {errors.package}
              </span>
            )}

            <div className="commission-note">
              <span>ℹ️</span>
              <p>
                <strong>Note:</strong> Commission is paid to the platform per confirmed booking as per the selected plan.
              </p>
            </div>
          </div>

          {submitError && <div className="error-msg" style={{ padding: "10px 0" }}>{submitError}</div>}

          <div className="tab-nav-footer">
            <button type="button" className="btn-back" onClick={() => setActiveTab("food")}>
              ← Back
            </button>
            <div className="form-submit-actions">
              <button type="submit" className="btn-submit-listing" disabled={loading}>
                {loading ? "Submitting..." : `🚀 ${submitLabel}`}
              </button>
              <button
                type="button"
                className="btn-cancel-form"
                onClick={() => navigate("/my-listings")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
