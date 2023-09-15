import React from 'react';
import './Logo.css';

import logo from '../assets/logolawnmanager.png';
import { Link } from 'react-router-dom';
function Logo() {
  return (
    <div className="logo ">
      <div className="logo-icon flex justify-center w-3/6 lg:w-4/6">
        <Link to="/">
          <img src={logo} alt="LawnManager Logo" />
        </Link>
      </div>
    </div>
  );
}

export default Logo;
