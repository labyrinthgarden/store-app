import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ cartItemCount }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const categories = [
    { name: 'Mujer', path: '/category/mujer' },
    { name: 'Hombre', path: '/category/hombre' },
    { name: 'Zapatos', path: '/category/zapatos' },
    { name: 'Accesorios', path: '/category/accesorios' },
    { name: 'Ropa Deportiva', path: '/category/deportiva' },
    { name: 'Novedades', path: '/category/novedades' },
    { name: 'Ofertas', path: '/category/ofertas' }
  ];

  const closeCategories = () => {
    setIsCategoriesOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            Fashion<span>Store</span>
          </Link>

          <nav>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link"><i className="fa-solid fa-house"></i> Inicio</Link>
              </li>

              <li className="nav-item">
                <Link to="/products/" className="nav-link"><i className="fa-solid fa-border-all"></i> Todos los Productos</Link>
              </li>
              {/* Elemento de categorías con menu desplegable */}
              <li
                className="nav-item categories-item"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={closeCategories}
              >
                <div className="nav-link categories-toggle">
                  <i className="fa-solid fa-list"></i> Categorías <i className="fas fa-chevron-down"></i>
                </div>

                {isCategoriesOpen && (
                  <div className="categories-dropdown">
                    <div className="dropdown-content">
                      {categories.map((category, index) => (
                        <Link
                          key={index}
                          to={category.path}
                          className="dropdown-item"
                          onClick={closeCategories}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
              <li className="nav-item">
                <Link to="/cart" className="cart-icon">
                  <i className="fas fa-shopping-cart"></i>
                  {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
