// UsersList.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import BASE_URL from "./UTILS";
import "./usersLists.css";
import Sidebar from "../components/Sidebar";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming token is stored in localStorage
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Sidebar />
      <Container className="mt-4">
        <Row>
          {users.map((user) => (
            <Col xs={12} sm={6} md={4} lg={3} key={user.id} className="mb-4">
              <Card className="user-card" >
                <Card.Img
                  variant="top"
                  src={user?.profile_picture || "data:image/jpeg;base64,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"} // Replace with a default image URL
                className="user-profile-picture"
                />
                <Card.Body style={{backgroundColor:'#183D3D', borderTop: '3px solid #183D3D'}}>
                  <Card.Title>
                    {user.first_name} {user.last_name}
                  </Card.Title>
                  <Card.Text>{user.role}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default UsersList;
