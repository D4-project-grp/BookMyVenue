import React from 'react'
import { useState } from "react";
import { updateImage } from "../../api/authService";
import toast from "react-hot-toast";
const ProfileImage = ({ firstName, lastName, photoPreview, setPhotoPreview }) => {
 
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  const handlePhotoChange = async(e) => {
    const file = e.target.files[0];
    const fd=new FormData();
    fd.append("profileImage",file);
    const response = await updateImage(fd);
    if (response.success) {
       
      setPhotoPreview(response.data);
      toast.success("Profile image updated successfully!");
    } else {
      toast.error("Failed to update profile image.");
    }
  };
  return (
   <div className="profile-avatar-section">
          <div className="profile-avatar-wrapper">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar-initials">{initials}</div>
            )}
          </div>
          <div className="profile-avatar-info">
            <h2>{firstName} {lastName}</h2>

            <label className="btn-change-photo">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
              📷 Change Photo
            </label>
          </div>
    </div>
  )
}

export default ProfileImage