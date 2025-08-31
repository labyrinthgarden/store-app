import { createContext, useState, useEffect } from 'react';
import { productService } from '../services/api';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await productService.getProducts();
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar los productos');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const value = {
    products,
    loading,
    error,
    featuredProducts: products.slice(0, 8),
    allProducts: products
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
