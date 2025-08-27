import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const Products = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Datos de ejemplo para productos
  const allProducts = [
    {
      id: 1,
      name: 'Vestido de Verano',
      price: 49.99,
      description: 'Vestido ligero perfecto para los días calurosos de verano.',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'mujer'
    },
    {
      id: 2,
      name: 'Camisa de Lino',
      price: 39.99,
      description: 'Camisa de lino 100% natural, fresca y elegante.',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'hombre'
    },
    {
      id: 3,
      name: 'Zapatos de Cuero',
      price: 89.99,
      description: 'Zapatos de cuero genuino con suela antideslizante.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'zapatos'
    },
    {
      id: 4,
      name: 'Bolso de Mano',
      price: 59.99,
      description: 'Bolso elegante con espacio suficiente para todos tus essentials.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'accesorios'
    },
    {
      id: 5,
      name: 'Chaqueta Denim',
      price: 69.99,
      description: 'Chaqueta de mezclilla clásica que nunca pasa de moda.',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'hombre'
    },
    {
      id: 6,
      name: 'Falda Plisada',
      price: 45.99,
      description: 'Falda elegante con pliegues perfectos para ocasiones formales.',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'mujer'
    },
    {
      id: 7,
      name: 'Gafas de Sol',
      price: 29.99,
      description: 'Protege tus ojos con estilo con estas gafas de sol de diseño.',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'accesorios'
    },
    {
      id: 8,
      name: 'Sneakers Urbanos',
      price: 79.99,
      description: 'Zapatillas cómodas y modernas para el día a día.',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'zapatos'
    },
    {
      id: 9,
      name: 'Sudadera con Capucha',
      price: 55.99,
      description: 'Sudadera cómoda perfecta para looks casuales.',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'deportiva'
    },
    {
      id: 10,
      name: 'Leggings Deportivos',
      price: 35.99,
      description: 'Leggings elásticos y transpirables para entrenamiento.',
      image: 'https://i.pinimg.com/originals/a6/8b/5c/a68b5ce186611b6b1da2ea9d9cd6cb8a.jpg',
      category: 'deportiva'
    },
    {
      id: 11,
      name: 'Vestido de Fiesta',
      price: 99.99,
      description: 'Elegante vestido para ocasiones especiales con 20% de descuento.',
      image: 'https://cdn0.matrimonio.com.co/img_c_8900/0/0/9/8/t30_10_8900.jpg',
      category: 'novedades',
      discount: true
    },
    {
      id: 12,
      name: 'Abrigo de Invierno',
      price: 129.99,
      description: 'Abrigo cálido con 30% de descuento en oferta especial.',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'ofertas',
      discount: true
    }
  ];

  // Efecto para filtrar productos cuando cambia la categoria en la URL
  useEffect(() => {
    if (categoryName) {
      const filtered = allProducts.filter(product =>
        product.category.toLowerCase() === categoryName.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [categoryName]);

  const clearFilter = () => {
    navigate('/products');
  };

  // Obtener el nombre de categoria para mostrar en el título
  const getCategoryTitle = () => {
    if (!categoryName) return 'Todos nuestros productos';

    const categoryTitles = {
      mujer: 'Mujer',
      hombre: 'Hombre',
      zapatos: 'Zapatos',
      accesorios: 'Accesorios',
      deportiva: 'Ropa Deportiva',
      novedades: 'Novedades',
      ofertas: 'Ofertas'
    };

    return `Productos de ${categoryTitles[categoryName] || categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`;
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1 className="section-title">
            {getCategoryTitle()}
          </h1>

          {categoryName && (
            <button className="btn btn-primary" onClick={clearFilter}>
              Ver todos los productos
            </button>
          )}
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products">
              <i className="fas fa-search"></i>
              <h3>No encontramos productos en esta categoría</h3>
              <p>Intenta con otra categoría o mira todos nuestros productos</p>
              <button className="btn btn-primary" onClick={clearFilter}>
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
