/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components
import BASE_URL from './UTILS';

const InstructorDashboard = ({ user }) => {
  const [instructors, setInstructors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
  });
  const [hover, setHover] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch(`${BASE_URL}/users/instructor`)
      .then((response) => response.json())
      .then((data) => {
        setInstructors(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user.id]);

  const handleRemoveInstructor = async (email) => {

    const confirmation_message = "You are about to delete this instructor. Proceed?"

    if(!confirm(confirmation_message)) {
        return 
    }
    try {
      const response = await fetch(`${BASE_URL}/users/instructor?email=${email}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      // alert(data.data.message)

      fetch(`${BASE_URL}/users/instructor`)
      .then((response) => response.json())
      .then((data) => {
        setInstructors(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });


    } catch (error) {
      console.error('Error deleting instructor:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
        </div>

        <div>
            <h2>Instructor List</h2>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {instructors.map((instructor) => (
                    <tr key={instructor.id}>
                    <td>{instructor.id}</td>
                    <td>{`${instructor.first_name} ${instructor.last_name}`}</td>
                    <td>{instructor.email}</td>
                    <td>
                    <Button
                        style={{
                        backgroundColor:'#1a4b4b',
                        borderColor: '#183d3d',
                        }}
                        onClick={() => handleRemoveInstructor(instructor.email)}
                    >
                        Remove 
                    </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
