import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductSelect = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onClick={handleProductSelect}
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
        <button className="btn btn-primary" onClick={handleProductSelect}>
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
