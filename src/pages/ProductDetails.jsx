import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/mockData';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div className="container section-padding">Product not found</div>;
    }

    return (
        <div className={`container section-padding`}>
            <div className={styles.header}>
                <h1>PRODUCT DETAILS</h1>
            </div>

            <div className={styles.detailsCard}>
                <div className={styles.cardHeader}>
                    <span className={styles.categoryBadge}>{product.category}</span>
                </div>

                <div className={styles.contentWrapper}>
                    <div className={styles.imageSection}>
                        {/* Image placeholder */}
                        <div className={styles.imagePlaceholder}>
                            {/* <img src={product.image} ... /> */}
                            <span>{product.name}</span>
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.infoBlock}>
                            <h3>: الوصف</h3>
                            <p>جراب Iphone 15 pro max الوان</p> {/* Static Arabic description as example */}
                        </div>

                        <div className={styles.infoBlock}>
                            <h3>: الابعاد</h3>
                            <p>159.9 mm (6.30 inches)</p>
                            <p>76.7 mm (3.02 inches)</p>
                        </div>

                        <div className={styles.infoBlock}>
                            <h3>: الالوان المتاحة</h3>
                            <p>احمر - اسود - رمادي - نبيتي</p>
                        </div>

                        <div className={styles.priceBlock}>
                            <h3>: السعر</h3>
                            <p className={styles.price}>{product.price} جنيه</p>
                        </div>

                        <button className={styles.addToCartBtn} onClick={() => addToCart(product)}>
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
