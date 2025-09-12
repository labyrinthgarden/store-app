import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts'; // Importar el hook
import './ProductDetail.css';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Obtener productos reales del contexto
  const { products, loading, error } = useProducts();
  const [product, setProduct] = useState(null);

  // Encontrar el producto cuando los productos se cargan o cambia el ID
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
    }
  }, [products, id]);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // Manejar estados de carga y error
  if (loading) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="loading-container">
            <p>Cargando producto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="error-container">
            <i className="fas fa-exclamation-triangle error-icon"></i>
            <h3>Error al cargar el producto</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="not-found-container">
            <i className="fas fa-search not-found-icon"></i>
            <h3>Producto no encontrado</h3>
            <p>El producto que buscas no existe o ha sido removido.</p>
            <button className="btn btn-primary" onClick={() => navigate('/products')}>
              Volver a productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity,
      size: selectedSize
    };
    addToCart(productToAdd);
    navigate('/cart');
  };

  return (
    <div className="product-detail">
      <div className="container">
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate('/products')}
        >
          &larr; Volver a productos
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${parseFloat(product.price).toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>

            <div className="size-selector">
              <label className="form-label">Talla:</label>
              <div className="size-options">
                {sizes.map(size => (
                  <div
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <label className="form-label">Cantidad:</label>
              <div className="d-flex align-items-center">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
