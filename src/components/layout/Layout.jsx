import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { LanguageProvider } from '../../context/LanguageContext';

const Layout = ({ children }) => {
  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Layout; 