import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isContact = location.pathname === '/contact';

  return (
    <header className="main-header">
      <div className="header-content">
        <img
          src="https://images.gestionaweb.cat/1722/pwimg-1100/serenta.png"
          alt="Logo"
          className="header-logo"
        />
        <nav className="nav-menu">
          <Link to="/" className={`nav-link ${isHome ? 'active' : ''}`}>Inicio</Link>
          <Link to="/contact" className={`nav-link ${isContact ? 'active' : ''}`}>Contacto</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;