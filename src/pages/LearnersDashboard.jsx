import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Sidebar from '../components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_URL from './UTILS';

const LearnersDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    console.log('Fetching enrollments for learner...');
    fetch(`${BASE_URL}/enrollments?learner_id=${user.id}`)
      .then((response) => {
        if (response.ok) {
          // Check if response is JSON
          return response.json();
        } else {
          return response.text().then(text => {
            throw new Error(`Unexpected response format: ${text}`);
          });
        }
      })
      .then((data) => {
        console.log('Fetched enrollments data:', data);
        setEnrollments(data);

        // Fetch course details
        const courseIds = data.map(enrollment => enrollment.course_id);
        if (courseIds.length > 0) {
          Promise.all(courseIds.map(courseId =>
            fetch(`${BASE_URL}/courses/${courseId}`)
              .then(response => {
                if (response.ok) {
                  // Check if response is JSON
                  return response.json();
                } else {
                  return response.text().then(text => {
                    throw new Error(`Unexpected response format: ${text}`);
                  });
                }
              })
          ))
          .then(coursesData => {
            console.log('Fetched courses data:', coursesData);
            setCourses(coursesData);
          })
          .catch(error => {
            console.error('Error fetching course details:', error);
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching enrollments data:', error);
      });
  }, [user.id]);

  const handleExploreCourses = () => {
    navigate('/browser'); // Redirect to explore courses page
  };

  const handleCardClick = (courseId) => {
    navigate(`/coursecontent/${courseId}`); // Redirect to CourseContent page
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
        </div>
        <div>
          {courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <FaPlus className="text-6xl text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">You have no enrolled courses yet!</h3>
              <p className="text-gray-600 mb-4">Enroll in a course.</p>
              <button
                onClick={handleExploreCourses}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Explore Courses
              </button>
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
                        src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAogMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFBgIBB//EADoQAAICAAUBBAcGAwkAAAAAAAABAgMEBRESMSETQVFhGiJScZGxwTNCcoGh0RU0kiMkMjVDVGJzgv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9xAAAAAAAAAI7rq6Ib7rIwj4yYEgMi70gwlb0rjZZ5paL9RRn+FselkZ1eb6oDXBSea4H/cw/U8/xfA6/brTx0egF8HmElOClFqUX1TXeegAAAAAAAAAAAAAAAAAYDAyM6zf+HTprrhGycusk3ppE5vF4q3GXu62Ter6Luiu5IizHFPGZjfdrrFzaj7l0R5jwB7R6R5R6QAMBgSwx2LqrVdWInCC4SLeX5/fRbGGNn2lD6OT5j5+Zly4ILeGB+jxaklKLTT6prvPpnZBHblGHXbdr6uuvh5flwaIAAAAAAAAAAAAAAK+YW9hgMTcua6pS+CZYKOef5Njv+ifyA4Gjg1MBgbMX1TUIJ/4mufcZ2Crd1sK195pHX4eEa4RhBaRitEBXqyXDpevZZL4ImWTYTT/U/qLsCVcAZzybCd3af1Ec8nw2nR2L/wBamq+COQHP4vKZVxcqJ9ovZa0Zi3dE0+TsrDnM7oVdvaR4nz7wNL0Jsbrxdbb0UoyS8NV1+R05y3oQvVxkvOH1OpAAAAAAAAAAAAAABXzCp3YDE1LmdUo/FMsHx8dQOByCOuKUvZg2dPWYeW0dhmWMp9iTj+WvQ3KwLMCVcEUCVcAHwRyJHwRyAr2GRncN2Dk++Mk/obFhlZv/ACNvuXzQE/oTH+54qfjdt+EV+50Zheh8NuVSft3Sf6JfQ3QAAAAAAAAAAAAAAQY9tYO5x52MnPF0O0pnB/ei0BzVFMYYiVq5lHSXno+TQrKUG9dr570W629oFuBKuCtGb0RJuer0YErIpvQ+uTfHgRSfiB4mUcZX21Mq3xLTX4luTehVtlprrwBdyP1e1jHpFJaJcI1jPyaGlE5v70unuRoAAAAAAAAAAAAAAAAAZmNweyUr4NaPlfsRVmnio7sPNeRmVgWYIkS6EcCVcAfGjxIkfBHICCzQiqw7xFm2LS05ZJYT5ZF7rJfkBcprjTXGuPEVoewAAAAAAAAAAAAAAAAAPkuq0Zlyiq7ZQT4ehqmRiW68bY+U2tfgBYgSrgireqTXBKuAD4I5Ej4I5AV7OC9goKOHi/a9ZmbiJN+quO81cMtMPUv+C+QEoAAAAAAAAAAAHzVLlgfQVL8xwlGqndFvwj1ZnX59ysPS/fN/RAbhXxGMw+H+2uhF+zr1+BzOIzHF36qd0kvCHRFTQDfxHpBVHVYeuU/OXRCuc8TCN9iipTWrUeDA0N7KpK3Bxin1r9Vr5ATVtwfl4FmEk1yjx2Y7MCSTj4kFk9ekfie+zHZgVthDHO54e2VN1KlGD2pwej0L0oxjFyk9Elq2czfLtb7LO6UtdAOow+bYO/RK3ZJ/dn0Lqeq1XU4dolovvw71ptlDyT6fADtAc5Rnl8NFdXGxd7XRmlh84wlvSUnW/Ca+oGiDzCyFkVKuUZRffF6noABqAKWa32YbDKdLSk5KOrWpz9t99/2ts5eWpu50tcIvxr5MxNgEGzpp3DYT7BsAg2DYT7BsAg2EmHssw9inU9H3rua8z3sGwDVw+Z0TX9snXL4pluOIw01rG+rT8SOf2DYB0TtoXV3Vpec0V7cwwtafr734Q6mLsGwCXG42zFLYlsq9ld/vKewn2DYBBsGwn2DYBBsGwn2DYBDDdW90G4y8YvQ18pxuJtxMarbN8XF8rqZ2wu5RHTGx/CwN38kD6AKWbfyy/GvqZG1AANqG1AANqG1AANqG1AANqG1AANqG1AANqG1AANqG1AANqG1AANqLWWLTGR9zAA2gAB//2Q=='
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
      </div>
    </div>
  );
};

export default LearnersDashboard;
