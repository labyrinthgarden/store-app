import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  // Datos de ejemplo para productos destacados
  const featuredProducts = [
    {
      id: 1,
      name: 'Vestido de Verano',
      price: 49.99,
      description: 'Vestido ligero perfecto para los días calurosos de verano.',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Camisa de Lino',
      price: 39.99,
      description: 'Camisa de lino 100% natural, fresca y elegante.',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      name: 'Zapatos de Cuero',
      price: 89.99,
      description: 'Zapatos de cuero genuino con suela antideslizante.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      name: 'Bolso de Mano',
      price: 59.99,
      description: 'Bolso elegante con espacio suficiente para todos tus essentials.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="home-container">
      <section className="hero">
        <div className="container">
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
      </section>

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
