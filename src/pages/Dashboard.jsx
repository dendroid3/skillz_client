import React, { useEffect, useState } from 'react';
import LearnersDashboard from './LearnersDashboard';
import InstructorDashboard from './InstructorDashboard';
import Sidebar from '../components/Sidebar';
import './Dashboard.css'; // Import custom CSS
import BASE_URL from './UTILS';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    fetch(`${BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setUser(data);
      setUserRole(data.role); // Ensure 'role' is correctly set
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  if (!userRole) {
    return <div>Loading...</div>;
  }

  console.log('User Role:', userRole); // Debugging: Check what role is being set

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-container">
        {userRole === 'learner' ? <LearnersDashboard user={user} /> : <InstructorDashboard user={user} />}
      </div>
    </div>
  );
};

export default Dashboard;
