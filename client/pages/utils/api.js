import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Change this to your backend API base URL

/**
 * Registers a new user
 * @param {Object} userData - User data to be registered
 * @returns {Object} - The created user data
 * @throws {String} - Error message if registration fails
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};


/**
 * Logs in a user
 * @param {Object} userData - User data to be used for logging in
 * @param {String} userData.email - User email
 * @param {String} userData.password - User password
 * @returns {Object} - The logged in user data
 * @throws {String} - Error message if login fails
 */
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, userData);
    return response.data.data; // Return the user data
  } catch (error) {
    throw error.response.data.message; // Throw the error message
  }
};


/**
 * Updates the user profile
 * @param {Object} profileData - User profile data to be updated
 * @param {String} token - Auth token of the logged in user
 * @returns {Object} - The updated user data
 * @throws {String} - Error message if update fails
 */
export const updateProfile = async (profileData, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

/**
 * Uploads the avatar for the logged in user
 * @param {Object} avatarData - Avatar data to be uploaded
 * @param {String} token - Auth token of the logged in user
 * @returns {Object} - The updated user data
 * @throws {String} - Error message if upload fails
 */
export const uploadAvatar = async (avatarData, token) => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarData); // Add avatar data to formData

    const response = await axios.post(`${API_BASE_URL}/user/profile/avatar`, formData, {
      headers: { // Set Authorization header and Content-Type header
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data; // Return the updated user data
  } catch (error) {
    throw error.response.data.message; // Throw the error message
  }
};

/**
 * Fetches analytics data based on the queryParams
 * @param {Object} queryParams - The query parameters to be sent in the request
 * @param {String} token - Auth token of the logged in user
 * @returns {Object} - The analytics data
 * @throws {String} - Error message if fetch fails
 */
export const fetchAnalytics = async (queryParams, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/analytics`, { // Fetch analytics data
      params: queryParams, // Send queryParams in the request
      headers: { // Set Authorization header and Content-Type header
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; // Return the analytics data
  } catch (error) {
    throw error.response.data.message; // Throw the error message
  }
};
