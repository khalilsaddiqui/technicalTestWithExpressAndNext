// pages/[[...slug]].js

import React from 'react';
import { useRouter } from 'next/router';

/**
 * This page is used as a fallback when the user visits a non-existent
 * route. It redirects the user to the login page instead.
 */
const LandingPage = () => {
  const router = useRouter();

  /**
   * Redirect to the login page when the component mounts
   */
  React.useEffect(() => {
    router.push('/login'); // Redirect to your default route
  }, []);

  /**
   * Render a loading message while the redirect is happening
   */
  return <div>Loading...</div>;
};


export default LandingPage;
