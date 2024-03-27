import React, { useState } from 'react';
import {updateProfile, uploadAvatar } from './utils/api';
import Layout from './layout';
import { useRouter } from 'next/router';
/**
 * The Profile page component for the client app
 */
export default function Home() {
  // The profile data stored in the component state
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  // The avatar file stored in the component state
  const [avatar, setAvatar] = useState(null);
  // The Next.js router
  const router = useRouter();
  // The message stored in the component state
  const [message, setMessage] = useState('');

  /**
   * Update user profile when the update button is clicked
   */
  const handleUpdateProfile = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      // Update the user profile with the profile data
      await updateProfile(profileData, token);
      // Set the message to success
      setMessage('Profile updated successfully');
    } catch (error) {
      // Set the message to the error message
      setMessage(error);

    }
  };

  /**
   * Upload the avatar when the upload button is clicked
   */
  const handleUploadAvatar = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      // Upload the avatar file
      await uploadAvatar(avatar, token);
      // Set the message to success
      setMessage('Avatar uploaded successfully');
    } catch (error) {
      // Set the message to the error message
      setMessage(error);
    }
  };


  return (
    <Layout>
      <h1>Profile Page</h1>
      <div>
        <div className="form-container">
          <h2>Update Profile</h2>
          <div className="form-group">
            <label>name:</label>
            <input type="text" placeholder="Name" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}  required/>
          </div>
          <div className="form-group">
            <label>email:</label>
            <input type="text" placeholder="Email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} required />
          </div>
          <button className="custom-button" onClick={handleUpdateProfile}>Update Profile</button>
        </div>


        <div className="form-container">
          <h2>Upload Avatar</h2>
          <div className="form-group">
            <label>avatar:</label>
            <input type="file" onChange={(e) => setAvatar(e.target.files[0])} required />
          </div>
          <button className="custom-button" onClick={handleUploadAvatar}>Upload Avatar</button>
          <div className={`login-message ${message ? 'show' : ''}`}>{message}</div>
        </div>

        
      </div>
    </Layout>
  );
}
