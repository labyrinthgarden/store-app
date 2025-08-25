import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Datos de ejemplo para productos
  const products = [
    {
      id: 1,
      name: 'Vestido de Verano',
      price: 49.99,
      description: 'Vestido ligero perfecto para los días calurosos de verano. Confeccionado en tejido transpirable y suave al tacto, este vestido te mantendrá fresca y con estilo durante todo el día. Ideal para playa, paseos urbanos o eventos casuales.',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Mujer'
    },
    {
      id: 2,
      name: 'Camisa de Lino',
      price: 39.99,
      description: 'Camisa de lino 100% natural, fresca y elegante. Perfecta para los días calurosos, esta camisa ofrece comodidad y estilo con su corte clásico y tejido de alta calidad que se mantiene impecable durante todo el día.',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Hombre'
    },
    {
      id: 3,
      name: 'Zapatos de Cuero',
      price: 89.99,
      description: 'Zapatos de cuero genuino con suela antideslizante. Confeccionados artesanalmente, estos zapatos combinan durabilidad y comodidad. Perfectos para ocasiones formales o para añadir un toque de elegancia a tu look diario.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Zapatos'
    },
    {
      id: 4,
      name: 'Bolso de Mano',
      price: 59.99,
      description: 'Bolso elegante con espacio suficiente para todos tus essentials. Con múltiples compartimentos y un diseño atemporal, este bolso es tan funcional como fashion. Perfecto para el día a día o ocasiones especiales.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Accesorios'
    }
  ];

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container">
        <p>Producto no encontrado</p>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Volver a productos
        </button>
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

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

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
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
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
