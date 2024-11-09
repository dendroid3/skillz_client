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
  const [courses, setCourses] = useState([]);
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
    fetch(`${BASE_URL}/courses?instructor_id=${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user.id]);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNewCourse({
      ...newCourse,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newCourse.title);
    formData.append('description', newCourse.description);
    formData.append('price', newCourse.price);
    formData.append('file', newCourse.image); // Use newCourse.image here
    formData.append('instructor_id', user.id);

    try {
      const response = await fetch(`${BASE_URL}/courses`, {
        method: 'POST',
        body: formData, // Do NOT set Content-Type here
      });
      const data = await response.json();
      setCourses([...courses, data]);
      handleModalClose();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleCardClick = (courseId) => {
    navigate(`/coursecontent/${courseId}`); // Navigate to the CourseContent page
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
        </div>

        {/* Button for Adding Course */}
        <div className="mb-6 text-center">
          <Button
            style={{
              backgroundColor: hover ? '#1a4b4b' : '#183d3d',
              borderColor: '#183d3d',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleModalShow}
          >
            Add Course
          </Button>
        </div>

        <div>
          {courses.length === 0 ? (
            <div className="text-center">
              <div className="flex flex-col items-center mb-4">
                <FaPlus className="text-6xl text-gray-400 mb-2" />
                <p className="text-gray-600 mb-4">It looks like you haven't created any courses. Start creating your first course to share your knowledge!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map(course => (
                <div
                  key={course.id}
                  className="bg-white p-4 rounded shadow cursor-pointer" // Add cursor-pointer class
                  onClick={() => handleCardClick(course.id)} // Handle card click
                >
                  <img
                    src={course.image_url || "https://via.placeholder.com/150"}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <h4 className="text-lg font-semibold">{course.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: 'large' }}>
                      <img
                        src='data:image/jpeg;base64,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'
                        alt={`${course.instructor?.first_name} ${course.instructor?.last_name}'s profile`}
                        style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                      />
                      <span>{`${course.instructor?.first_name} ${course.instructor?.last_name}`}</span>
                  </div>
                  <p className="text-gray-700">{course.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal for Adding Course */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="courseTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter course title"
                  name="title"
                  value={newCourse.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="courseDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter course description"
                  name="description"
                  value={newCourse.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="coursePrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter course price"
                  name="price"
                  value={newCourse.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="courseImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Button
                style={{
                  backgroundColor: hover ? '#1a4b4b' : '#183d3d',
                  borderColor: '#183d3d',
                }}
                className="mt-3"
                type="submit"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Add Course
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

      </div>
    </div>
  );
};

export default InstructorDashboard;
