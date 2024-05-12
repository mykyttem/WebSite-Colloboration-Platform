import React from 'react';
import "./navBar.css";


const NavBar = () => {
  return (
    <header className="header_main">
      <div>
        <a href="/projects" style={{ color: 'transparent' }}>
          <button className="home-button">CB-Platform ✨</button>
        </a>
      </div>
      <div className="main-search">
        <input type="search" placeholder="Search..." />
      </div>
      <div className="right-icons">
        <a href="/notifications" style={{ color: 'transparent' }}>
          <button className="mail"><samp>&#9993;</samp></button>
        </a>
        <a href="/sign-up" style={{ color: 'transparent' }}>
          <button className="sign-up">Sign Up</button>
        </a>
        <a href="/sign-in" style={{ color: 'transparent' }}>
          <button className="sign-in">Sign In</button>
        </a>
      </div>
    </header>
  );
};


export default NavBar;