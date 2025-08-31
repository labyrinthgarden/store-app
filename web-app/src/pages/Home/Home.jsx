import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { featuredProducts, error } = useProducts();

  const heroImages = [
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);
  const handlePrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  };

  if (error) {
    return (
      <div className="home-container">
        <div className="error-container">
          <i className="fas fa-exclamation-triangle error-icon"></i>
          <h3>Error al cargar los productos</h3>
          <p style={{padding:'55px'}}>{error}</p>
          <button className="btn btn-primary"
            onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container" >
      <section className="hero" style={{ backgroundImage: `url(${heroImages[currentImage]})` }}>
        <div className="overlay">
          <div className="hero-content">
            <h1 className="hero-title">Descubre tu estilo único</h1>
            <p className="hero-subtitle">
              Encuentra las últimas tendencias en moda para hombre y mujer.
              Calidad premium a precios increíbles.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Comprar ahora
            </button>
          </div>
          <button className="arrow left" onClick={handlePrev}>
            ❮
          </button>
          <button className="arrow right" onClick={handleNext}>
            ❯
          </button>
        </div>

      </section>
      <div className="dots-container">
        {heroImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentImage === index ? 'active' : ''}`}
            onClick={() => setCurrentImage(index)}
          ></span>
        ))}
      </div>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Productos Destacados</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <div className="container text-center">
          <h2 className="section-title">Por qué elegirnos</h2>
          <div className="features-grid">
            <div className="feature-item">
              <i className="fas fa-truck feature-icon"></i>
              <h3>Envío Gratis</h3>
              <p>En todos los pedidos superiores a $50</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-undo feature-icon"></i>
              <h3>Devoluciones</h3>
              <p>30 días para cambiar de opinión</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-headset feature-icon"></i>
              <h3>Soporte 24/7</h3>
              <p>Atención al cliente dedicada</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
