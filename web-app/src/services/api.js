import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api-gateway',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const productService = {
  getProducts: async () => {
    try {
      const response = await api.get('products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getFeaturedProducts: async () => {
    try {
      const response = await api.get('/products?featured=true');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }
};

export default api;
