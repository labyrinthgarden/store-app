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
      category: 'accesorios'
    },
    {
      id: 5,
      name: 'Chaqueta Denim',
      price: 69.99,
      description: 'Chaqueta de denim clásica con un toque moderno. Confeccionada en algodón de alta calidad, esta chaqueta es perfecta para cualquier ocasión. Combínala con tus outfits favoritos para un look casual y a la moda.',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'hombre'
    },
    {
      id: 6,
      name: 'Falda Plisada',
      price: 45.99,
      description: 'Falda plisada elegante y versátil, perfecta para cualquier ocasión. Confeccionada en un tejido ligero y fluido, esta falda se adapta a tu figura y te brinda comodidad durante todo el día. Combínala con una blusa ajustada para un look sofisticado o con una camiseta casual para un estilo más relajado.',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'mujer'
    },
    {
      id: 7,
      name: 'Gafas de Sol',
      price: 29.99,
      description: 'Gafas de sol elegantes con protección UV. Estas gafas no solo te protegerán del sol, sino que también añadirán un toque de estilo a tu look. Perfectas para días de playa o paseos por la ciudad.',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'accesorios'
    },
    {
      id: 8,
      name: 'Sneakers Urbanos',
      price: 79.99,
      description: 'Sneakers urbanas cómodas y a la moda, perfectas para el día a día. Con un diseño ligero y transpirable, estos zapatos te brindan el soporte que necesitas para tus actividades diarias. Combínalas con jeans o pantalones cortos para un look casual y moderno.',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'zapatos'
    },
    {
      id: 9,
      name: 'Sudadera con Capucha',
      price: 55.99,
      description: 'Sudadera con capucha de estilo urbano, perfecta para mantenerte cómodo y a la moda. Confeccionada en algodón suave, esta sudadera es ideal para días frescos. Combínala con jeans o pantalones deportivos para un look casual.',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'deportiva'
    },
    {
      id: 10,
      name: 'Leggings Deportivos',
      price: 35.99,
      description: 'Leggings deportivos de alta compresión, ideales para tus entrenamientos. Confeccionados en un tejido suave y transpirable, estos leggings se adaptan a tu cuerpo y te brindan el soporte necesario. Combínalos con una camiseta deportiva para un look completo.',
      image: 'https://i.pinimg.com/originals/a6/8b/5c/a68b5ce186611b6b1da2ea9d9cd6cb8a.jpg',
      category: 'deportiva'
    },
    {
      id: 11,
      name: 'Vestido de Fiesta',
      price: 99.99,
      description: 'Vestido de fiesta elegante y sofisticado, perfecto para ocasiones especiales. Confeccionado en un tejido de alta calidad, este vestido realza tu figura y te hará lucir deslumbrante. Combínalo con accesorios llamativos para un look completo.',
      image: 'https://cdn0.matrimonio.com.co/img_c_8900/0/0/9/8/t30_10_8900.jpg',
      category: 'novedades'
    },
    {
      id: 12,
      name: 'Abrigo de Invierno',
      price: 129.99,
      description: 'Abrigo de invierno elegante y cálido, perfecto para los días fríos. Confeccionado en un tejido de alta calidad, este abrigo te mantendrá abrigado sin sacrificar el estilo. Combínalo con tus outfits de invierno para un look sofisticado.',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'ofertas'
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
