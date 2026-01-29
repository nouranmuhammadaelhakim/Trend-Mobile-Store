import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ category }) => {
    return (
        <Link to={category.link} className={styles.card}>
            <div className={styles.imageWrapper}>
                {/* Placeholder for image */}
                <div className={styles.placeholderIcon}>
                    {category.icon}
                </div>
                {/* Use img when assets available: <img src={category.image} alt={category.title} /> */}
            </div>
            <div className={styles.content}>
                <h3>{category.title}</h3>
            </div>
        </Link>
    );
};

export default CategoryCard;
