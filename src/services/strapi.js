import axios from 'axios';

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Create axios instance with default config
const strapiClient = axios.create({
  baseURL: `${STRAPI_API_URL}/api`,
  headers: {
    'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = async () => {
  try {
    const response = await strapiClient.get('/products?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const response = await strapiClient.get(`/products/${id}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await strapiClient.post('/products', {
      data: productData
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await strapiClient.put(`/products/${id}`, {
      data: productData
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await strapiClient.delete(`/products/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Categories API
export const getCategories = async () => {
  try {
    const response = await strapiClient.get('/categories?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await strapiClient.post('/categories', {
      data: categoryData
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await strapiClient.put(`/categories/${id}`, {
      data: categoryData
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await strapiClient.delete(`/categories/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Check if Strapi is configured
export const isStrapiConfigured = () => {
  return Boolean(STRAPI_API_URL && STRAPI_API_TOKEN);
};

export default strapiClient;
