import React from 'react';

const Dashboard = React.lazy(() => import('./Components/Dashboard'));
const Login = React.lazy(() => import('./Components/Login'));
const Register = React.lazy(() => import('./Components/Register'));
const UserProfile = React.lazy(() => import('./Components/Profile/UserProfile'));
 

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/login', exact: true,  name: 'Login', component: Login },
    { path: '/dashboard', exact: true,  name: 'Dashboard', component: Dashboard },
    { path: '/register', exact: true,  name: 'Register', component: Register },
    { path: '/user-profile', exact: true,  name: 'User-Profile', component: UserProfile },
    
]

export default routes;