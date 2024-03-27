import React, { useState } from 'react';
import { fetchAnalytics } from './utils/api';
import Layout from './layout';
import DataTable from './DataTable'; // Import the DataTable component
import { useRouter } from 'next/router';

/**
 * Analytics page that fetches and displays analytics data based on query parameters.
 */
export default function AnalyticsPage() {
  // Store state for error/success messages and analytics data
  const [message, setMessage] = useState('');
  const [analyticsData, setAnalyticsData] = useState([]);

  // Get Next.js router instance
  const router = useRouter();

  /**
   * Fetch analytics data from the server based on query parameters.
   * Redirect to login page on error and update state with the error message.
   */
  const handleFetchAnalytics = async () => {
    try {
      // Example query parameters
      const queryParams = {};

      // Get token from local storage
      const token = localStorage.getItem('token');

      // Fetch analytics data from the server
      const data = await fetchAnalytics(queryParams, token);

      // Update state with the fetched data
      setAnalyticsData(data);
    } catch (error) {
      // Update state with the error message
      setMessage(error);

      // Redirect to login page
      router.push('/login');
    }
  };

  // Define columns for the analytics data table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Method',
        accessor: 'method',
      },
      {
        Header: 'Path',
        accessor: 'path',
      },
      {
        Header: 'Timestamp',
        accessor: 'timestamp',
      },
    ],
    []
  );

  return (
    <Layout>
      <h1>Analytics Page</h1>

      <div>
        <div className="form-container">
          <h2>Analytics Data</h2>

          <button className="custom-button" onClick={handleFetchAnalytics}>
            Fetch Analytics
          </button>

          {/* Render the DataTable component with columns and analyticsData */}
          <DataTable columns={columns} data={analyticsData} />

          <div className={`login-message ${message ? 'show' : ''}`}>{message}</div>
        </div>
      </div>
    </Layout>
  );
}
