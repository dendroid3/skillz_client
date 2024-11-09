// src/components/Profile.js
import React, { useState, useEffect } from "react";
import "./profile.css";
import { Col, Container, Row } from "react-bootstrap";
import BASE_URL from "./UTILS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import EditUserModal from "./editusermodal";

const Profile = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming token is stored in localStorage
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching the user data:", error);
    }
  };

  const fetchCoursesData = async () => {
    if (user && user.role === "instructor") {
      try {
        const response = await fetch(
          `${BASE_URL}/courses?instructorId=${user.id}`
        );
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching the courses:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      await fetchCoursesData();
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <Sidebar />
      <Container style={{ borderBottom: "1px solid black" }}>
        <Row>
          <Col xs={3}>
            <div className="profile">
              <img
                src={
                  user?.profile_picture ||
                  "data:image/png;base64,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"
                } // Replace with a default image URL
                alt="Profile"
                className="profile-picture"
              />
              <h2>
                {user?.first_name} {user?.last_name}{" "}
              </h2>
            </div>
          </Col>
          <Col style={{ paddingLeft: "900px" }}>
            <FontAwesomeIcon
              icon={faUserPen}
              onClick={handleShowModal}
              style={{ cursor: "pointer" }}
            />
          </Col>
        </Row>
        <Row>
          <p>{user?.bio}</p>
        </Row>
        {user.role === "instructor" && (
          <Row>
            <h3>Courses</h3>
            {courses.length > 0 ? (
              courses.map((course) => (
                <Col key={course.id} md={4}>
                  <div className="course-card">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="course-image"
                    />
                    <h4>{course.title}</h4>
                    <p>Category: {course.category}</p>
                    <p>
                      Rating: {course.rating} ({course.ratingCount} ratings)
                    </p>
                    <p>Price: {course.price}</p>
                  </div>
                </Col>
              ))
            ) : (
              <p>No courses available</p>
            )}
          </Row>
        )}
      </Container>
      <EditUserModal
        show={showModal}
        handleClose={handleCloseModal}
        user={user}
        refreshUserData={fetchUserData}
      />
    </div>
  );
};

export default Profile;
