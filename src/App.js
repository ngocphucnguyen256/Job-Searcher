import Home from './pages/Home';
import React, { useEffect } from 'react';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import SideMenu from './partials/SideMenu';

function App() {

  const location = useLocation();
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change


  return (
    <div className="App">
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/profile" element={<Profile/>}/>
        <Route  path="/sign-in" element={<SignIn/>}/>
        <Route  path="/sign-up" element={<SignUp/>}/>
        <Route  path="/side-menu" element={<SideMenu/>}/>
        <Route  path="*" element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
