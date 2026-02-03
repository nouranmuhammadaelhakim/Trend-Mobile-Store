import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProducts, getCategories, isStrapiConfigured } from '../services/strapi';
import { products as mockProducts, categories as mockCategories } from '../data/mockData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState(mockProducts);
    const [categories, setCategories] = useState(mockCategories);
    const [isLoading, setIsLoading] = useState(false);
    const [usingStrapiData, setUsingStrapiData] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        // Check if Strapi is configured
        if (!isStrapiConfigured()) {
            console.log('Strapi not configured, using mock data');
            setUsingStrapiData(false);
            return;
        }

        setIsLoading(true);
        try {
            // Fetch data from Strapi
            const [strapiProducts, strapiCategories] = await Promise.all([
                getProducts(),
                getCategories()
            ]);

            // Transform Strapi data to match our frontend format
            if (strapiProducts && strapiProducts.length > 0) {
                const transformedProducts = strapiProducts.map(item => ({
                    id: item.id,
                    name: item.attributes.name,
                    category: item.attributes.category,
                    price: item.attributes.price,
                    oldPrice: item.attributes.oldPrice,
                    image: item.attributes.image,
                    description: item.attributes.description,
                    stock: item.attributes.stock || 0,
                    isNew: item.attributes.isNew || false,
                    isBestSeller: item.attributes.isBestSeller || false
                }));
                setProducts(transformedProducts);
                setUsingStrapiData(true);
            }

            if (strapiCategories && strapiCategories.length > 0) {
                const transformedCategories = strapiCategories.map(item => ({
                    id: item.id,
                    title: item.attributes.title,
                    image: item.attributes.image,
                    icon: item.attributes.icon,
                    link: item.attributes.link || `/category/${item.attributes.title.toLowerCase().replace(/\s+/g, '-')}`
                }));
                setCategories(transformedCategories);
            }
        } catch (error) {
            console.error('Error loading data from Strapi:', error);
            // Keep using mock data on error
            setUsingStrapiData(false);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshData = () => {
        loadData();
    };

    return (
        <DataContext.Provider value={{ 
            products, 
            categories, 
            isLoading, 
            usingStrapiData,
            refreshData
        }}>
            {children}
        </DataContext.Provider>
    );
};
