import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png';
import LanguageSwitcher from '../LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    window.location.href = 'https://scd3.expertvision.com.br/';
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="left-section">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        </nav>
        
        <div className="nav-right">
          <LanguageSwitcher />
        </div>
        
        <button 
          className="menu-button" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Header; 