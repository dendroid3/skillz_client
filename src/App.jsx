import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import Dashboard from './pages/Dashboard';
import Browser from './pages/Browser' 
import MessagesPage from './pages/MessagesPage';
import { MessagesProvider } from './components/MessagesContext'; 
import Home from './pages/Home';
import PaymentPage from './pages/PaymentPage';
import './index.css';
import Profile from './pages/InstructorProfile';
import InstructorProfile from './components/InstructorProfile'; 
import TwoFactorAuth from './components/TwoFactorAuth'
import UsersList from './pages/users';
import CourseContent from './pages/coursecontent'

const App = () => {
  return (
    <MessagesProvider> 
      <div className="App">
        <Router>
          <div className="content">
            <button id="installButton" style="display: none;">Install App</button>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/TwoFactorAuth" element={<TwoFactorAuth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/payment/:courseId/:learnerId" element={<PaymentPage />} />
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/browser' element={< Browser/>}/>
              <Route path='/users' element={<UsersList/>}/>
              <Route path='/coursecontent/:courseId' element={<CourseContent/>}/>

            </Routes> 
          </div>
        </Router>
      </div>
    </MessagesProvider>

  );
};

export default App;
