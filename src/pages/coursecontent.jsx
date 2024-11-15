import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Form } from 'react-bootstrap'; // Import Bootstrap components
import ReactPlayer from 'react-player';
import { FaStar } from 'react-icons/fa';
import BASE_URL from './UTILS';

const CourseContent = () => {
    const { courseId } = useParams(); // Get courseId from route parameters
    const [course, setCourse] = useState(null);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [showAddContentModal, setShowAddContentModal] = useState(false);
    const [userId, setUserId] = useState(false);
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    
    const handleAddContentModalClose = () => setShowAddContentModal(false);
    const handleAddContentModalShow = () => setShowAddContentModal(true);
    const handleAddReviewModalShow = () => setShowAddReviewModal(true);
    const handleAddReviewModalClose = () => setShowAddReviewModal(false);

    const [newContent, setNewContent] = useState({
        content_type: '',
        content_url: '',
    });

    const [newReview, setNewReview] = useState({
        comment: 'Enter review',
        rating: 0
    })

    const [rating, setRating] = useState(0); // Track the current rating

    // Handle star click
    const handleStarClick = (value) => {
        setRating(value); // Update rating based on clicked star
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = newContent
        data.course_id = courseId

        try {
            const response = await fetch(`${BASE_URL}/coursecontents`, {
              method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
              body: JSON.stringify(data)
            });
            console.log(response)
            handleAddContentModalClose();
            fetchCourseData()
        } catch (error) {
            console.error('Error creating coursecontents:', error);
        }
    }    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContent({
          ...newContent,
          [name]: value,
        });
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview({
          ...newReview,
          [name]: value,
        });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault()

        const data = {
            course_id: courseId,
            learner_id: localStorage.getItem('user_id'),
            rating: rating,
            comment: newReview.comment
        }

        try {
            const response = await fetch(`${BASE_URL}/reviews`, {
              method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
              body: JSON.stringify(data)
            });
            handleAddReviewModalClose()
            fetchCourseData()
        } catch (error) {
            console.error('Error creating reviews:', error);
        }
    }
    
    const fetchCourseData = () => {
        
        fetch(`${BASE_URL}/courses/${courseId}`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.error('Error fetching course data:', error));

        fetch(`${BASE_URL}/coursecontents?course_id=${courseId}`)
            .then(response => response.json())
            .then(data => {
                setContents(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching course contents:', error);
                setLoading(false);
            });
    }

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        console.log(user_id)
        setUserId(user_id)
        fetchCourseData()
    }, [courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col md={12}>
                    <Card  style={{ marginBottom: '5px' }}>
                        <Card.Body>
                            <Card.Title>
                                <div style={{ marginTop: '10px', marginBottom: '5px', fontSize: '2rem', fontWeight: '400' }}>
                                    <strong>{course.title}</strong>
                                </div>
                                {(userId && course.instructor && String(userId) === String(course.instructor.id)) && (
                                    <Button
                                        variant="success"
                                        className="mb-3"
                                        onClick={handleAddContentModalShow}
                                    >
                                        Add Content
                                    </Button>
                                )}
                                {(userId && course.instructor && String(userId) !== String(course.instructor.id)) && (
                                    <Button
                                        variant="success"
                                        className="mb-3"
                                        onClick={handleAddReviewModalShow}
                                    >
                                        Add Reviews
                                    </Button>
                                )}


                            </Card.Title>
                            <Card.Text as="div">
                                <div style={{ marginTop: '10px', marginBottom: '5px', fontSize: '1.5rem', fontWeight: '400' }}>
                                    <strong>About</strong>
                                </div>
                                <div style={{ marginTop: '10px', marginBottom: '5px', fontSize: '1rem', fontWeight: '400' }}>
                                    {course.description}
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12}>
                    {contents.map((content, index) => (
                        <Card key={index} className="mb-3">
                            
                            <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>
                                <Card.Text as="div">Part {index + 1}</Card.Text>
                            </div>
                            {content.content_type === 'Video' && (
                                <Card.Body>
                                    <ReactPlayer
                                        url={content.content_url}
                                        controls
                                        width="100%"
                                        height="50vh"
                                    />
                                </Card.Body>
                            )}
                            {content.content_type === 'Text' && (
                                <Card.Body>
                                    <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>
                                        <Card.Text as="div">{content.content_url}</Card.Text>
                                    </div>
                                </Card.Body>
                            )}
                        </Card>
                    ))}
                </Col>
                <Col md={12}>
                    {course.reviews.map((review, index) => (
                        <Card key={index} className="mb-0">
                            
                            <div className="flex pt-4 px-4">
                                {[...Array(review.rating)].map((_, index) => (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        style={{ cursor: "pointer" }}
                                        color="#ffc107"
                                    />
                                ))}
                            </div>
                            <Card.Body>
                                <span className="text-sm">
                                    { review.comment }
                                </span>
                            </Card.Body>
                           
                        </Card>
                    ))}
                </Col>
            </Row>
            <Row className="justify-content-center mt-4 mb-4">
                <Button className="mb-4" variant="secondary" onClick={() => navigate(-1)}>Back</Button>
            </Row>

                
            <Modal show={showAddContentModal} onHide={handleAddContentModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>{`Add Content (Part ${(contents.length + 1)})`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group controlId="contentType">
                    <Form.Label>Content Type</Form.Label>
                    <Form.Control
                        as="select"
                        name="content_type"
                        value={newContent.content_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select countent type</option>
                        <option value="Video">Video</option>
                        <option value="Text">Text</option>
                    </Form.Control>
                </Form.Group>

                { newContent.content_type === "Text" ? (
                    <Form.Group controlId="contentURL">
                        <Form.Label>Content (max: 255)</Form.Label>
                        <Form.Control
                                as="textarea"  // Use 'textarea' for a large input box
                                rows={4}       // Adjust the number of rows to control height
                                name="content_url"
                                value={newContent.content_url}
                                onChange={handleChange}
                                placeholder="Enter content"
                                required
                        />
                    </Form.Group>
                ) : (
                    <Form.Group controlId="contentURL">
                        <Form.Label>Youtube URL</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="https://youtube.com/"
                        name="content_url"
                        value={newContent.content_url}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                )}

                <Button
                    style={{
                    backgroundColor: 1==1 ? '#1a4b4b' : '#183d3d',
                    borderColor: '#183d3d',
                    }}
                    className="mt-3"
                    type="submit"
                >
                    Add Content
                </Button>
                </Form>
            </Modal.Body>
            </Modal>
            
        <Modal show={showAddReviewModal} onHide={handleAddReviewModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{`Add Review`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleReviewSubmit}>
            <Form.Group controlId="contentURL">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                        as="textarea"  // Use 'textarea' for a large input box
                        rows={4}       // Adjust the number of rows to control height
                        name="comment"
                        value={newReview.comment}
                        onChange={handleReviewChange}
                        placeholder="Enter review"
                        required
                />
            </Form.Group>

            <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((star) => (
                        <FaStar
                            key={star}
                            size={24}
                            color={star <= rating ? "#ffc107" : "#e4e5e9"} // Yellow for selected, gray otherwise
                            onClick={() => handleStarClick(star)}
                            style={{ cursor: "pointer" }}
                        />
                    ))}
                </div>
            </Form.Group>

            <Button
                style={{
                  backgroundColor: 1==1 ? '#1a4b4b' : '#183d3d',
                  borderColor: '#183d3d',
                }}
                className="mt-3"
                type="submit"
              >
                Add Review
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        </Container>
    );
};

export default CourseContent;
