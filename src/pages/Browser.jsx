import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  Navbar,
  NavDropdown,
  ListGroup,
  Button,
} from "react-bootstrap";
import SearchBar from "./searchbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import BASE_URL from './UTILS';

const Browser = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state
  const [learnerId, setLearnerId] = useState(null);

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
      setLearnerId(data.id);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });

    // Fetch courses
    fetch(`${BASE_URL}/courses`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);

        // Extract unique categories from the courses data
        const uniqueCategories = [
          ...new Set(data.map((course) => course.category)),
        ];
        setCategories(uniqueCategories);

        // Initially, show all courses
        setFilteredCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === "All Categories") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) => course.category === category);
      setFilteredCourses(filtered);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px",
        paddingBottom: "700px",
      }}
    >
      <Row style={{ borderBottom: "1px solid black", marginBottom: "40px" }}>
        <Col>
          <Navbar
            bg="light"
            expand="lg"
            style={{
              marginLeft: sidebarOpen ? "250px" : "0",
              transition: "margin-left 0.3s",
            }}
          >
            <Navbar.Brand
              href="#"
              onClick={toggleSidebar}
              style={{ cursor: "pointer" }}
            >
              ☰ SKILLZ
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown
                  title="Categories"
                  id="basic-nav-dropdown"
                  onSelect={handleCategorySelect}
                >
                  <NavDropdown.Item eventKey="All Categories">
                    All Categories
                  </NavDropdown.Item>
                  {categories.map((category, index) => (
                    <NavDropdown.Item key={index} eventKey={category}>
                      {category}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
        <Col>
          <div>
            <SearchBar onSearch={handleSearch} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col
          md={sidebarOpen ? 3 : 0}
          style={{
            backgroundColor: "#ffffff",
            padding: "10px",
            transition: "width 0.3s",
            overflow: "hidden",
          }}
        >
          {sidebarOpen && (
            <ListGroup variant="flush">
              <Sidebar />
            </ListGroup>
          )}
        </Col>

        <Col md={sidebarOpen ? 9 : 12} style={{ transition: "width 0.2s" }}>
          <Row>
            {filteredCourses.map((course, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card style={{ borderRadius: "5px" }}>
                <Card.Img
                    variant="top"
                    src={course.image_url || 'https://via.placeholder.com/300x200.png?text=No+Image'}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body style={{ backgroundColor: '#1B3043', color: '#ffffff' }}>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.price} Shillings</Card.Text>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: 'large' }}>
                      <img
                        src='data:image/jpeg;base64,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'
                        alt={`${course.instructor?.first_name} ${course.instructor?.last_name}'s profile`}
                        style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                      />
                      <span>{`${course.instructor?.first_name} ${course.instructor?.last_name}`}</span>
                    </div>
                    <Link to={`/payment/${course.id}/${learnerId}`}>
                    <Button variant="light" style={{ marginTop: '10px' }}>Enroll</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Browser;
