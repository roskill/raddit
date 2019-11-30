import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div className="nav-flex-container">
    <div className="nav-item-logo">
      <Link to="/">raddit</Link>
    </div>
    <div className="nav-item">
      <Link to="/newpost">New Post</Link>
    </div>
    <div className="nav-item">
      <Link to="/about">About</Link>
    </div>
  </div>
);

export default NavBar;
