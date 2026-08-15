import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import "./EditProfile.css";
import ProfileImage from "../../components/customer/ProfileImage";
import { getUserProfile, updateProfile, updatePassword ,updateImage} from "../../api/authService";
export default function CustomerEditProfile() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    street: "",
    locality: "",
    city: "",
    pincode: "",
    
  });


  // console.log(user)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserProfile();

        // Adjust this line according to your service
        const profile = response.data;

        setUser(profile);

        setFormData({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          email: profile.email || "",
          mobile: profile.mobileNo || "",
          street: profile.address?.street || "",
          locality: profile.address?.locality || "",
          city: profile.address?.city || "",
          pincode: profile.address?.pincode || "",

        });
        setPhotoPreview(profile.profileImg || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [pwErrors, setPwErrors] = useState({});
  const [saved, setSaved] = useState(false);
  

   const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePwChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    if (pwErrors[e.target.name]) setPwErrors({ ...pwErrors, [e.target.name]: "" });
  };

  

  const validateProfile = () => {
    const errs = {};
    if (!formData.firstName) errs.firstName = "First name is required";
    if (!formData.lastName) errs.lastName = "Last name is required";
    if (!formData.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.mobile) errs.mobile = "Mobile is required";
    return errs;
  };

  const validatePasswords = () => {
    const errs = {};
    if (passwords.newPass || passwords.confirm || passwords.current) {
      if (!passwords.current) errs.current = "Current password is required";
      if (!passwords.newPass || passwords.newPass.length < 6)
        errs.newPass = "New password must be at least 6 characters";
      if (passwords.newPass !== passwords.confirm)
        errs.confirm = "Passwords do not match";
    }
    return errs;
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    const errs = validateProfile();
    // const pwErrs = validatePasswords();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // if (Object.keys(pwErrs).length > 0) { setPwErrors(pwErrs); return; }

    const response = await updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobileNo: formData.mobile,
      address: {
        street: formData.street,
        locality: formData.locality,
        city: formData.city,
        pincode: formData.pincode,
      }

    });
    if (response.success == true) {
      toast.success(response.message);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  const changePassword = async () => {
    const pwErrs = validatePasswords();
    if (Object.keys(pwErrs).length > 0) { setPwErrors(pwErrs); return; }
    // Here you would call your API to change the password
    try {
      const { data } = await updatePassword({
        currentPassword: passwords.current,
        newPassword: passwords.newPass,
      });

      toast.success(data.message);

      setPasswords({
        current: "",
        newPass: "",
        confirm: "",
      });

    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update password.";

      toast.error(message);
    }
  }
  return (
    <div className="edit-profile">
      <div className="page-header">
        <h1 className="page-title">Edit Profile</h1>
        <p className="page-subtitle">Update your personal information and account settings</p>
      </div>

      <form onSubmit={handleProfileSave} className="profile-form">
        {/* Profile avatar section */}
        <ProfileImage firstName={formData.firstName} lastName={formData.lastName} photoPreview={photoPreview} setPhotoPreview={setPhotoPreview} />

        {saved && (
          <div className="success-banner">
            ✅ Profile updated successfully!
          </div>
        )}

        {/* Personal Info */}
        <div className="form-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Mobile No *</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+91 98765-43210"
                className={errors.mobile ? "error" : ""}
              />
              {errors.mobile && <span className="error-msg">{errors.mobile}</span>}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="form-section">
          <h3 className="section-title">Address</h3>
          <div className="form-grid">
            <div className="form-group form-full">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street address"
              />
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
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
              />
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-save">
            💾 Save Changes
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </form>
      <div>

        {/* Change Password */}
        <div className="form-section">
          <h3 className="section-title">Change Password</h3>
          <p className="section-note">Leave blank if you don't want to change your password.</p>
          <div className="form-grid">
            <div className="form-group form-full">
              <label>Current Password</label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePwChange}
                placeholder="Enter current password"
                className={pwErrors.current ? "error" : ""}
              />
              {pwErrors.current && <span className="error-msg">{pwErrors.current}</span>}
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPass"
                value={passwords.newPass}
                onChange={handlePwChange}
                placeholder="Minimum 6 characters"
                className={pwErrors.newPass ? "error" : ""}
              />
              {pwErrors.newPass && <span className="error-msg">{pwErrors.newPass}</span>}
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePwChange}
                placeholder="Confirm new password"
                className={pwErrors.confirm ? "error" : ""}
              />
              {pwErrors.confirm && <span className="error-msg">{pwErrors.confirm}</span>}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" onClick={changePassword} className="btn-save">
            💾 Update Password
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
