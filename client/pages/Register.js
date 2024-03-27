import React, { useState } from 'react';
import { registerUser  } from './utils/api';
import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * The register page for the client app
 */
export default function Home() {
  // The user data stored in the component state
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // The login message stored in the component state
  const [message, setMessage] = useState('');

  // The Next.js router
  const router = useRouter();

  /**
   * Register the user when the register button is clicked
   */
  const handleRegister = async () => {
    try {
      // Register the user with the user data
      await registerUser(userData);

      // Set the login message
      setMessage('User registered successfully');

      // Redirect the user to the login page
      router.push('/login');
    } catch (error) {
      // Set the login message to the error message
      setMessage(error);
    }
  };

  return (
    <div>

      <div className="form-container">
        <h2>User Registration</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>email:</label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
          />
        </div>
        <button className="custom-button" onClick={handleRegister}>
          Register
        </button>
        <Link href="/login">
          <button className="custom-button">Go to login</button>
        </Link>
        <div className={`login-message ${message ? 'show' : ''}`}>{message}</div>
      </div>
    </div>
  );
}

