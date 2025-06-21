import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // optional if you want specific navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className='logo'>
            ItemNest
        </div>
        <div className="links">
            <Link to="/">View Items</Link>
            <Link to="/add">Add Items</Link>
        </div>
    </nav>
  );
};

export default Navbar;
