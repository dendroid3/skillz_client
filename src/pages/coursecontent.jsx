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
    const [allContent, setAllContentadedContents] = useState([]);
    const [gradedContent, setGradedContents] = useState([]);
    const [firstNonGradedContent, setFirstNonGradedContent] = useState([]);
    const [newAnswer, setNewAnswer] = useState({});

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const [showAddContentModal, setShowAddContentModal] = useState(false);
    const [userId, setUserId] = useState(false);
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [displaySection, setDisplaySection] = useState('content');
    
    const handleAddContentModalClose = () => setShowAddContentModal(false);
    const handleAddContentModalShow = () => {
        setDisplaySection('content')
        setShowAddContentModal(true)
    };
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

        console.log("data", data)
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
    
        try {
            const response = await fetch(`${BASE_URL}/coursecontents`, {
              method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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

    const handleAnswerChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        setNewAnswer({
          ...newAnswer,
          [name]: value,
        });

        console.log("setNewContent", newContent.answer)
    }
    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview({
          ...newReview,
          [name]: value,
        });
    };

    const gradeAnswer = async (answer_id, max_grade) => {
        const grade = prompt("Enter Grade")

        if(grade > max_grade) {
            alert("The given grade cannot be higher than the max grade")
            return
        }

        const data = {
            answer_id: answer_id,
            grade: Number(grade)
        }
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        try {
            const response = await fetch(`${BASE_URL}/grades`, {
              method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
              body: JSON.stringify(data)
            });

            const responseJson = await response.json
            console.log("responseJson", responseJson)
            // handleAddReviewModalClose()
            // fetchCourseData()
        } catch (error) {
            console.error('Error creating reviews:', error);
        }
    }

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
    
    const handleAddAnswer = async (coursecontent_id) => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        
        const data = {
            answer: newAnswer.answer,
            coursecontent_id: coursecontent_id
        }
        
        try {
            const response = await fetch(`${BASE_URL}/answers`, {
              method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
              body: JSON.stringify(data)
            });
            fetchCourseData()
        } catch (error) {
            console.error('Error creating reviews:', error);
        }
    }

    const fetchCourseData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
    
        fetch(`${BASE_URL}/courses/${courseId}`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.error('Error fetching course data:', error));

        const response = await fetch(`${BASE_URL}/coursecontents?course_id=${courseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const responseData = await response.json()
        if(response.ok) {
            // Initialize the arrays for graded content and the first non-graded content
            let gradedContents = [];
            let firstNonGradedContent = null;
            setAllContentadedContents(responseData)
        
            // Loop through the response data
            responseData.forEach(content => {
                if (content.answer !== null) {
                    // If the content has a grade, add it to the gradedContents array
                    gradedContents.push(content);
                } else if (firstNonGradedContent === null) {
                    // If the content does not have a grade and we haven't found a non-graded content yet
                    firstNonGradedContent = content;
                }
            });
        
            // After processing the data, set the state
            setGradedContents(gradedContents);
            setFirstNonGradedContent(firstNonGradedContent); 

            const answersResponse = await fetch(`${BASE_URL}/answers/${courseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const answersResponseJson = await answersResponse.json()
            setAnswers(answersResponseJson)
            
            setLoading(false);
        } else {
            console.error('Error fetching course contents:', error);
            setLoading(false);
        }
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
                                    <>
                                        <Button
                                            variant="success"
                                            className="mx-1 mb-3"
                                            onClick={handleAddContentModalShow}
                                        >
                                            Add Content
                                        </Button>
                                            <Button
                                            variant="success"
                                            className="mx-1 mb-3"
                                            onClick={() => {setDisplaySection('grades')}}
                                        >
                                            Grade Answers
                                        </Button>
                                    </>
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
                {(userId && course.instructor && String(userId) === String(course.instructor.id)) && (
                    <>
                        {displaySection == 'content' ? (
                            <Col md={12}>
                                {allContent.map((content, index) => (
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
                                                    <h4 className="mb-1 mt-4 underline">Course Work</h4>
                                                    <Card.Text as="div">{content.content_url}</Card.Text>
                                                    
                                                    <h4 className="mb-1 mt-4 underline">Assignment (*/{content.max_grade})</h4>
                                                    {content.assignment}
                                                </div>
                                            </Card.Body>
                                        )}
                                    </Card>
                                ))}
                            </Col>
                        ) : (
                            <div>
                                {answers.map((answer, index) => (
                                    <Card key={index} className="mb-3">
                                        <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>
                                            <Card.Text as="div">Part {index + 1}</Card.Text>
                                        </div>
                                        <Card.Body>
                                            <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>
                                                <h4 className="mb-1 mt-4 underline">Assignment (*/{answer.max_grade})</h4>
                                                {answer.assignment}

                                                {(gradedAnswer.length > 0 || unGradedAnswer) ? (
                                                    <h4 className="mb-1 mt-4 underline">Answers</h4>
                                                ) : (
                                                    <h4 className="mb-1 mt-4">No Answers Submitted yet.</h4>
                                                )}
                                                {answer.answers_with_grade[0] &&
                                                    <> 
                                                    <h5 className="mb-1 underline">(Graded)</h5>
                                                    <Card className="p-2">
                                                        {answer.answers_with_grade.map((gradedAnswer, index) => (
                                                            <>
                                                                <p>
                                                                    <strong>Learner: </strong> {`${gradedAnswer.learner.first_name} ${gradedAnswer.learner.last_name}`}
                                                                </p>
                                                                <p>
                                                                    <strong>Answer: </strong> {`${gradedAnswer.answer}`}
                                                                </p>
                                                                <p>
                                                                    <strong>Grade: </strong> {`${gradedAnswer.grade.grade}`}
                                                                </p>
                                                            </>
                                                        ))}
                                                    </Card>
                                                    </>
                                                }
                                                {answer.answers_without_grade[0] &&
                                                    <> 
                                                        <h5 className="mb-1 underline">(Not Graded)</h5>
                                                        <Card className="p-2">
                                                            {answer.answers_without_grade.map((unGradedAnswer, index) => (
                                                                <>
                                                                    <p>
                                                                        <strong>Learner: </strong> {`${unGradedAnswer.learner.first_name} ${unGradedAnswer.learner.last_name}`}
                                                                    </p>
                                                                    <p>
                                                                        <strong>Answer: </strong> {`${unGradedAnswer.answer}`}
                                                                    </p>
                                                                    
                                                                    <Button
                                                                        variant="success"
                                                                        className="mx-1 mb-3"
                                                                        onClick={() => {gradeAnswer(unGradedAnswer.id, answer.max_grade)}}
                                                                    >
                                                                        Grade Answer
                                                                    </Button>
                                                                </>
                                                            ))}
                                                        </Card>
                                                    </>
                                                }
                                                

                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </>
                    
                )}
                {(userId && course.instructor && String(userId) !== String(course.instructor.id)) && (
                    <Col md={12}>
                    {gradedContent.map((content, index) => (
                        <Card key={index} className="mb-3">
                            
                            <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>
                                <Card.Text as="div">Part {index + 1}</Card.Text>
                            </div>
                            {content.content_type === 'Video' && (
                                <Card.Body>
                                    <h4 className="mb-1 underline" style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>Course Work</h4>
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
                                        <h4 className="mb-1 underline">Course Work</h4>
                                        <Card.Text as="div">{content.content_url}</Card.Text>
                                    </div>
                                </Card.Body>
                            )}
                            
                            <Card.Body>
                                <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>
                                    <Card.Text as="div">
                                        <h4 className="mb-1 underline">Assignment</h4>
                                        {content.assignment}
                                    </Card.Text>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>
                                    <Card.Text as="div">
                                        <h4 className="mb-1 underline">Answer ({(content.grade ? content.grade : "*")}{`/${content.max_grade}`})</h4>
                                        {content.answer}
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}

                    <Card className="mb-3">
                        <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>
                            <Card.Text as="div">Part {(gradedContent.length) + 1}</Card.Text>
                        </div>
                        {firstNonGradedContent.content_type === 'Video' && (
                            <Card.Body>
                                <h4 className="mb-1 underline" style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>Course Work</h4>
                                <ReactPlayer
                                    url={firstNonGradedContent.content_url}
                                    controls
                                    width="100%"
                                    height="50vh"
                                />
                            </Card.Body>
                        )}
                        {firstNonGradedContent.content_type === 'Text' && (
                            <Card.Body>
                                <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>
                                    <h4 className="mb-1 underline">Course Work</h4>
                                    <Card.Text as="div">{firstNonGradedContent.content_url}</Card.Text>
                                </div>
                            </Card.Body>
                        )}
                        
                        <Card.Body>
                            <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '400', paddingLeft: '2rem' }}>
                                <Card.Text as="div">
                                    <h4 className="mb-1 underline">Assignment (*/{firstNonGradedContent.max_grade})</h4>
                                    {firstNonGradedContent.assignment}
                                    <Form>

                                        <Form.Group controlId="answer">
                                            <Form.Label className='text-sm mt-4 underline'>Answer</Form.Label>
                                            <Form.Control
                                                as="textarea"  
                                                rows={4}       
                                                name="answer"
                                                value={newAnswer.answer}
                                                onChange={handleAnswerChange}
                                                placeholder="Enter answer"
                                                required
                                            />
                                        </Form.Group>
                                        <Button
                                            style={{
                                            backgroundColor: 1==1 ? '#1a4b4b' : '#183d3d',
                                            borderColor: '#183d3d',
                                            }}
                                            className="mt-3"
                                            onClick={() => {handleAddAnswer(firstNonGradedContent.id)}}
                                        >
                                            Submit Answer
                                        </Button>
                                    </Form>
                                </Card.Text>
                            </div>
                        </Card.Body>

                        { ((1 + gradedContent.length) < allContent.length) ? 
                            (
                                <p className="text-sm text-center pb-4 text-gray-400">
                                    ------More Content Locked Until You Answer-------
                                </p>
                            ) : (
                                <p className="text-sm text-center pb-4 text-gray-400">
                                    ------End of Course-------
                                </p>
                            )
                        }
                    </Card>
                </Col>
                )}
                
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
                <Modal.Title>{`Add Content (Part ${(allContent.length + 1)})`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group controlId="contentType">
                    <Form.Label className='text-sm'>Content Type</Form.Label>
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
                        <Form.Label className='text-sm'>Content (max: 255)</Form.Label>
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
                        <Form.Label className='text-sm'>Youtube URL</Form.Label>
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

                
                <Form.Group controlId="assignment">
                    <Form.Label className='text-sm'>Assignment</Form.Label>
                    <Form.Control
                    as="textarea"  
                    rows={4}       
                    type="text"
                    placeholder="Assignment"
                    name="assignment"
                    value={newContent.assignment}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>

                
                <Form.Group controlId="contentURL">
                    <Form.Label className='text-sm'>Max Grade</Form.Label>
                    <Form.Control
                    type="number"
                    placeholder="100"
                    name="max_grade"
                    value={newContent.max_grade}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>

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
