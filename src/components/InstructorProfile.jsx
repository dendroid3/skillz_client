// import React from 'react';

const InstructorProfile = () => {
  const styles = {
    profileContainer: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#345E4F',
      color: '#fff',
      padding: '20px',
      boxSizing: 'border-box',
    },
    profileHeader: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      padding: '10px 0',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    instructorInfo: {
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0',
      borderBottom: '1px solid #000',
      position: 'relative',
      flex: '0 1 auto',
    },
    profilePicContainer: {
      marginRight: '20px',
    },
    profilePic: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    profileDetails: {
      flexGrow: 1,
    },
    profileDetailsTitle: {
      margin: '0',
      fontSize: '24px',
    },
    profileDetailsText: {
      margin: '5px 0 0',
      fontSize: '18px',
    },
    editIconContainer: {
      position: 'absolute',
      top: '20px',
      right: '20px',
    },
    coursesSection: {
      flex: '1 1 auto',
      marginTop: '20px',
      overflowY: 'auto',
    },
    coursesSectionTitle: {
      marginBottom: '10px',
      fontSize: '20px',
    },
    coursesList: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
    },
    courseCard: {
      backgroundColor: '#23443C', 
      padding: '10px',
      borderRadius: '5px',
      width: 'calc(33.33% - 20px)', 
      boxSizing: 'border-box',
    },
    courseImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '5px',
    },
    courseDetails: {
      paddingTop: '10px',
    },
    courseTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      margin: '0',
    },
    courseCategory: {
      fontSize: '14px',
      color: '#B3B3B3',
    },
    courseRating: {
      fontSize: '14px',
      marginTop: '5px',
    },
    coursePrice: {
      marginTop: '10px',
      backgroundColor: '#000',
      color: '#fff',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.profileContainer}>
      <header style={styles.profileHeader}>
        <div style={styles.logo}>LOGO</div>
      </header>
      
      <section style={styles.instructorInfo}>
        <div style={styles.profilePicContainer}>
          <img
            style={styles.profilePic}
            src="profile-pic-url" 
            alt="Instructor"
          />
        </div>
        <div style={styles.profileDetails}>
          <h2 style={styles.profileDetailsTitle}>Bill Kiprop</h2>
          <p style={styles.profileDetailsText}>
            i am a certified martial arts instructor. Buy my course
          </p>
        </div>
        <div style={styles.editIconContainer}>
          <button style={styles.editIcon}>
            <svg/>
          </button>
        </div>
      </section>

      <section style={styles.coursesSection}>
        <h3 style={styles.coursesSectionTitle}>COURSES:</h3>
        <div style={styles.coursesList}>
          {[...Array(3)].map((_, index) => (
            <div key={index} style={styles.courseCard}>
              <img
                style={styles.courseImage}
                src={`course-image-url-${index}`}
                alt="Course"
              />
              <div style={styles.courseDetails}>
                <p style={styles.courseTitle}>TITLE</p>
                <p style={styles.courseCategory}>Category</p>
                <div style={styles.courseRating}>
                  <span>⭐⭐⭐⭐⭐</span> (23,235)
                </div>
                <button style={styles.coursePrice}>10k</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InstructorProfile;
