import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/images/logo-beharv.png';
import Navbar from '../Navbar';
import LanguageSwitcher from '../../LanguageSwitcher';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <img 
            src={logo} 
            alt="Beharv" 
            className="header-logo"
          />
        </Link>
        <Navbar />
        <div className="nav-right">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header; 