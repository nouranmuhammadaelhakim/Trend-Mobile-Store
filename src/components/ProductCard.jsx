import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                {product.isNew && <span className={styles.badgeNew}>New</span>}
                <div className={styles.placeholderImage}>
                    {/* img src={product.image} */}
                    <span>{product.name}</span>
                </div>

                <div className={styles.actions}>
                    <button className={styles.actionBtn}><FaHeart /></button>
                    <button className={styles.actionBtn} onClick={() => addToCart(product)}><FaShoppingCart /></button>
                </div>
            </div>

            <div className={styles.details}>
                <div className={styles.tag}>{product.category}</div>
                <Link to={`/product/${product.id}`} className={styles.title}>
                    {product.name}
                </Link>
                <div className={styles.price}>
                    {product.price} EGP
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
