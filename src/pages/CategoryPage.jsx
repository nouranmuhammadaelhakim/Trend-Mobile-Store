import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { useData } from '../context/DataContext';
import styles from './CategoryPage.module.css';

const CategoryPage = () => {
    const { category } = useParams();
    const { products } = useData();

    // Normalize category string for comparison if needed, or matched exactly
    // "all" shows everything
    // "services" etc.

    let categoryProducts = [];
    let displayTitle = "";

    if (category === 'all') {
        categoryProducts = products;
        displayTitle = "OUR SERVICES AND PRODUCTS";
    } else {
        // Simple filtering loosely based on URL naming conventions
        // e.g. /category/smart-watches -> "Smart Watches"
        const formattedCat = category.replace('-', ' ');
        displayTitle = formattedCat.toUpperCase();

        // Filter products (case insensitive partial match or strict)
        categoryProducts = products.filter(p =>
            p.category.toLowerCase().includes(formattedCat.toLowerCase()) ||
            formattedCat.toLowerCase().includes(p.category.toLowerCase())
        );

        if (categoryProducts.length === 0 && category === 'services') {
            displayTitle = "OUR SERVICES";
            // Maybe services aren't products in mockData? 
            // For now show empty or generic.
        }
    }

    return (
        <div className={`container section-padding ${styles.categoryPage}`}>
            <div className={styles.header}>
                <h1>{displayTitle}</h1>
                <p>جميع خدماتنا والمنتجات المتاحة لدينا</p>
            </div>

            {category === 'all' && (
                <div className={styles.subHeader}>
                    <h2>PHONE CASES</h2>
                    <p>تشكيلة كبيرة من كل اشكال جرابات الموبايل لكل الموديلات</p>
                </div>
            )}

            <div className={styles.grid}>
                {categoryProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
