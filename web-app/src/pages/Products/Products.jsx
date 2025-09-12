import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts'; // Importar el hook
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const Products = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Obtener productos reales del contexto
  const { products, loading, error } = useProducts();

  // Filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Efecto para filtrar productos cuando cambian los filtros o los productos
  useEffect(() => {
    if (loading) return;

    let filtered = [...products]; // Usar productos reales

    // Filtrar por categoría si hay una seleccionada
    if (categoryName) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === categoryName.toLowerCase()
      );
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por precio
    if (priceFilter !== 'all') {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price);
        if (priceFilter === 'under50') return price < 50;
        if (priceFilter === '50to100') return price >= 50 && price <= 100;
        if (priceFilter === 'over100') return price > 100;
        return true;
      });
    }

    setFilteredProducts(filtered);
  }, [categoryName, searchTerm, priceFilter, products, loading]);

  const clearFilter = () => {
    setSearchTerm('');
    setPriceFilter('all');
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
      deportes: 'Deportes', // Cambiado de 'deportiva' a 'deportes'
      novedades: 'Novedades',
      ofertas: 'Ofertas'
    };

    return `Productos de ${categoryTitles[categoryName] || categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`;
  };

  // Manejar estados de carga y error
  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="loading-container">
            <p>Cargando productos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="error-container">
            <i className="fas fa-exclamation-triangle error-icon"></i>
            <h3>Error al cargar los productos</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1 className="section-title">
            {getCategoryTitle()}
          </h1>
          <div className="filters-container">
            {/* Barra de búsqueda */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Filtro de precio */}
            <div className="select-filter">
              <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                <option value="all">Todos los precios</option>
                <option value="under50">Menos de $50</option>
                <option value="50to100">$50 - $100</option>
                <option value="over100">Más de $100</option>
              </select>
            </div>
            {(searchTerm || priceFilter !== 'all') && (
              <button className="clear-btn" onClick={clearFilter}>
                Limpiar filtros
              </button>
            )}
          </div>

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
              <h3>No encontramos productos con estos filtros</h3>
              <p>Intenta con otros filtros o mira todos nuestros productos</p>
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
