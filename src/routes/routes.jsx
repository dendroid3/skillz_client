import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';
import Profile from '../pages/InstructorProfile';
import LearnersDashboard from '../pages/LearnersDashboard';
import Browser from '../pages/Browser';
import GuitarLessons from '../pages/coursecontent';

const routes =createBrowserRouter([
    {
        path:'/',
        element:<Browser/>
    },
    {
        path:'/signup',
        element:<SignUpForm/>
    },
    {
        path:'/signin',
        element:<SignInForm/>
    },
    {
        path:'/profile',
        element:<Profile/>
    },
    {
        path:'/dashboard',
        element:<LearnersDashboard/>
    }

])

export default routes