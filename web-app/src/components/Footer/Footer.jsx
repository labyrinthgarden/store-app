import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-heading">FS-Store</h3>
            <p>Tu tienda de moda online con las últimas tendencias y los mejores precios.</p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Contacto</h3>
            <ul className="footer-links">
              <li><i className="fas fa-map-marker-alt"></i> Calle Principal 123, Ciudad</li>
              <li><i className="fas fa-phone"></i> +1 234 567 890</li>
              <li><i className="fas fa-envelope"></i> info@FS-Store.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2023 FS-Store. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
