import React, { useState, useEffect } from 'react';
import './home.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
// import { useNavigate } from 'react-router-dom';
import './home.css';
import BASE_URL from './UTILS';
import Sidebar from '../components/Sidebar';

const images = [
  {
    name: 'Cooking',
    image: 'https://cdn.dribbble.com/users/1728164/screenshots/7691121/media/427794bd98ce50efc9c2118637c0ff62.jpg',
  },
  {
    name: 'Self-Defence',
    image: 'https://cdn.dribbble.com/users/508588/screenshots/14286526/media/5811455e1c1a346eb1b2af639ee3f6e9.jpg?resize=840x630&vertical=center',
  },
  {
    name: 'Photography',
    image: 'https://petapixel.com/assets/uploads/2022/02/types-of-photography-genres-you-should-know.jpg',
  },
  {
    name: 'Art',
    image: 'https://img.freepik.com/premium-vector/world-art-day-flat-style-vector-illustration_825692-323.jpg',
  },
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Fetch user profile picture if logged in
    if (token) {
      const fetchProfilePicture = async () => {
        try {
          const response = await fetch(`${BASE_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setProfilePicture(data?.profile_picture || 'data:image/png;base64,...'); // Replace with a default image
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      };

      fetchProfilePicture();
    }
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/browser');
    } else {
      navigate('/signin');
    }
  };

  const handleProfilePictureClick = () => {
    navigate('/profile');
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleLoginClick = () => {
    navigate('/signin'); // Navigate to login page
  };

  const handleSignupClick = () => {
    navigate('/signup'); // Navigate to signup page
  };

  const faqs = [
    {
      question: "What is Skillz?",
      answer: "Skillz is an online learning platform that offers thousands of creative classes taught by experts in various fields."
    },
    {
      question: "How do I enroll in a course?",
      answer: "You can enroll in a course by signing up for an account, browsing through the available courses, and clicking 'Enroll' on the course of your choice."
    },
    {
      question: "Can I access courses offline?",
      answer: "Yes, you can download courses to access them offline through our mobile app."
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer: "Yes, you will receive an accolade of completion for each course you successfully finish."
    },
    {
      question: "What if I have technical issues or need support?",
      answer: "We offer 24/7 support through our help center. You can reach out to us anytime for assistance."
    }
  ];

  return (
    <div>
      <div>
        <Sidebar/>
      </div>
      <div style={{paddingLeft: '300px'}}>
        <Container className='navbarDiv'>
          <Row>
            <Col xs={8}>
              <h2><b>SKILLZ</b></h2>
            </Col>
            <Col xs={4} style={{ textAlign: 'right' }}>
              {!isLoggedIn ? (
                <>
                  <Button onClick={handleLoginClick} style={{ marginRight: '10px' }} className='get-started-btn'>Log In</Button>
                  <Button onClick={handleSignupClick} className="get-started-btn">Sign Up</Button>
                </>
              ) : (
                <img
                  src={profilePicture}
                  alt="Profile"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
                  onClick={handleProfilePictureClick}
                />
              )}
            </Col>
          </Row>
        </Container>

      <Container>
        <Row>
          <Col className="header-col">
            <div className="header-content">
              <h4><b>Become a Pro with thousands of creative classes</b></h4>
              <Button className="get-started-btn" onClick={handleGetStarted} >Get Started</Button>
              {isLoggedIn && (
                <NavLink to={'/dashboard'}>
                  <Button className='get-started-btn' style={{marginLeft:'20px'}}>My dashboard</Button>
                </NavLink>
              )}
              

            </div>
          </Col>
        </Row>
      </Container>
      <Container className='image-container'>
        <Row>
          {images.map((obj, index) => (
            <Col key={index} xs={3}>
              <img src={obj.image} alt='showcase' className="showcase-img" />
              <h2 className='names'><i>{obj.name}</i></h2>
            </Col>
          ))}
        </Row>
      </Container>
      <Container>
        <Row>
          <div className='desc'>
            <Col xs={6}>
              <div className="creative-learning">
                <h1>Creative Learning at your convenience</h1>
              </div>
            </Col>
            <Col xs={6} className="checklist">
              <div className="checklist-item">
                <FontAwesomeIcon icon={faSquareCheck} className="icon" />
                <h3 className="white-text"><i>Sign up</i></h3>
              </div>
              <div className="checklist-item">
                <FontAwesomeIcon icon={faSquareCheck} className="icon" />
                <h2 className="white-text"><i>Enroll in a course and start learning</i></h2>
              </div>
              <div className="checklist-item">
                <FontAwesomeIcon icon={faSquareCheck} className="icon" />
                <h2 className="white-text"><i>Accolades to celebrate your accomplishments</i></h2>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <Col xs={3}>
            <div className="info-box" style={{ marginLeft: '30px' }}>1K+ COURSES</div>
          </Col>
          <Col xs={3}>
            <div className="info-box">1K+ LEARNERS</div>
          </Col>
          <Col xs={3}>
            <div className="info-box">1K+ INSTRUCTORS</div>
          </Col>
          <Col xs={3}>
            <div className="info-box">4.5   ★★★★☆<br />APP STORE RATING</div>
          </Col>
        </Row>
      </Container>
      <Container style={{ height: '900px', transform: 'translateY(-100px)' }}>
        <h1>Why Skillz?</h1>
        <Row>
          <Col xs={6} style={{ width: '480px', paddingTop: '40px', textAlign: 'center', paddingLeft: '80px' }}>
            <h2>
              “This platform has transformed
              the way I learn new skills!
              The courses are practical and
              engaging.“
            </h2><br />
            <h2><b>~Billy Butcher</b></h2>
          </Col>
        </Row>
        <Row>
          <Col xs={6} style={{ width: '1200px', paddingTop: '40px', textAlign: 'center', paddingLeft: '780px' }}>
            <h2 style={{ fontWeight: "lighter" }}>
              "This app makes it so easy to learn
              at my own pace and the
              instructors are top-notch!"
            </h2><br />
            <h2>~Joel Ochieng</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={6} style={{ width: '480px', paddingTop: '40px', textAlign: 'center', paddingLeft: '80px' }}>
            <h2>
              "The photography courses on this
              app are amazing!! I've learned new
              techniques that have taken my
              work to the next level."
            </h2><br />
            <h2>
              ~Louis du Lac
            </h2>
          </Col>
        </Row>
      </Container>
      <Container style={{ height: '550px', backgroundColor: '#183D3D', color: 'white', textAlign: 'center', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
        <div style={{ paddingTop: '50px', fontSize: 'large' }}>
          <h2>Frequently Asked Questions (FAQs)</h2>
        </div>
        <Row>
          <Col style={{ paddingLeft: '220px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ margin: '20px 0', cursor: 'pointer', borderBottom: '1px solid white', width: "900px", paddingBottom: '20px' }} onClick={() => toggleFAQ(index)}>
                <h4>{faq.question}</h4>
                {activeIndex === index && (
                  <p style={{ marginTop: '10px', fontSize: 'medium' }}>
                    <i>{faq.answer}</i>
                  </p>
                )}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <div className='help' style={{ backgroundColor: 'black', height: '300px' }}></div>
      </div>
    </div>
  );
}

export default Home;