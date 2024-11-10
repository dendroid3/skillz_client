// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SignUpForm from './components/SignUpForm';
// import SignInForm from './components/SignInForm';
// import Dashboard from './pages/Dashboard';
// import Browser from './pages/Browser' 
// import MessagesPage from './pages/MessagesPage';
// import { MessagesProvider } from './components/MessagesContext'; 
// import Home from './pages/Home';
// import PaymentPage from './pages/PaymentPage';
// import './index.css';
// import Profile from './pages/InstructorProfile';
// import InstructorProfile from './components/InstructorProfile'; 
// import TwoFactorAuth from './components/TwoFactorAuth';
// import UsersList from './pages/users';
// import CourseContent from './pages/coursecontent';

// const App = () => {
  // Handling the deferred prompt for installation
  // let deferredPrompt;
  // window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default installation prompt
    // event.preventDefault();
    // deferredPrompt = event;

    // Show the install button
  //   const installButton = document.getElementById('installButton');
  //   if (installButton) {
  //     installButton.style.display = 'block';
  //   }
  // });

  // Handle the install button click
  // const handleInstallClick = () => {
  //   if (deferredPrompt) {
  //     deferredPrompt.prompt();
  //     deferredPrompt.userChoice.then((choiceResult) => {
  //       if (choiceResult.outcome === 'accepted') {
  //         console.log('User accepted the install prompt');
  //       } else {
  //         console.log('User dismissed the install prompt');
  //       }
  //       deferredPrompt = null; // Reset the deferred prompt after user choice
  //     });
  //   }
  // };

  // return (
    // <MessagesProvider> 
    //   <div className="App">
        {/* <Router>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/TwoFactorAuth" element={<TwoFactorAuth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/payment/:courseId/:learnerId" element={<PaymentPage />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/browser' element={<Browser />} />
              <Route path='/users' element={<UsersList />} />
              <Route path='/coursecontent/:courseId' element={<CourseContent />} />
            </Routes>
          </div>
        </Router> */}

        {/* Install button (hidden by default) */}
  //       <button
  //         id="installButton"
  //         onClick={handleInstallClick}
  //         style={{ display: '', position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '16px' }}
  //       >
  //         Install App
  //       </button>
  //     </div>
  //   </MessagesProvider>
  // );
// };

// export default App;
