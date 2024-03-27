import React, { useState } from 'react';
import { loginUser } from './utils/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
/**
 * The login page for the client app
 */
export default function Home() {
  // The user data stored in the component state
  const [userData, setUserData] = useState({ email: '', password: '' });
  // The Next.js router
  const router = useRouter();
  // The login message stored in the component state
  const [message, setMessage] = useState('');



  /**
   * Login the user when the login button is clicked
   */
  const handleLogin = async () => {
    try {
      // Login the user with the user data
      const token = await loginUser(userData);
      // Store the token in localStorage
      localStorage.setItem('token', token);
      // Redirect the user to the profile page
      router.push('/Profile');
     // Show login success message
     setMessage('Login successful');
     // Hide the message after 3 seconds
     setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      // Set the login message to the error message
      setMessage(error);
    }
  };

  return (
    <div>
      <h1>Client App</h1>

      <div className="form-container">
        <h2>User Login</h2>
        <div className="form-group">
          <label>email:</label>
          <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} required />
        </div>
        <button className="custom-button" onClick={handleLogin}>Login</button>
        <Link href="/Register">
          <button className="custom-button">Go to Register</button>
        </Link>
        <div className={`login-message ${message ? 'show' : ''}`}>{message}</div>
      </div>
    </div>
  );
}
