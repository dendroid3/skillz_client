// import React from 'react';
import PropTypes from 'prop-types';

const CourseCard = ({ course }) => {
  return (
    <div style={styles.card}>
      <img src={course.image} alt={course.title} style={styles.courseImage} />
      <div style={styles.cardBody}>
        <h4>{course.title}</h4>
        <p>{course.category}</p>
        <p>⭐ {course.rating} ({course.enrolled})</p>
        <button style={styles.tokenButton}>{course.tokens}k</button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
    course: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    enrolled: PropTypes.number.isRequired,
    tokens: PropTypes.number.isRequired,
  }).isRequired,
};

const styles = {
  card: {
    backgroundColor: '#34554f',
    borderRadius: '10px',
    overflow: 'hidden',
    width: '200px',
    margin: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  courseImage: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
  },
  cardBody: {
    padding: '10px',
    color: 'white',
  },
  tokenButton: {
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default CourseCard;
