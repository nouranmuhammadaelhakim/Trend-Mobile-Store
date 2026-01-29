import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import styles from './Cart.module.css';
import SectionTitle from '../components/SectionTitle';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className={`container ${styles.cartPage} section-padding`}>
            <SectionTitle title="Your Cart" />

            {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                    <p>Your cart is currently empty.</p>
                    <Link to="/" className={styles.continueBtn}>Continue Shopping</Link>
                </div>
            ) : (
                <div className={styles.cartContent}>
                    <div className={styles.cartItems}>
                        {cartItems.map(item => (
                            <div key={item.id} className={styles.cartItem}>
                                <div className={styles.itemImage}>
                                    {/* img src={item.image} */}
                                    <span>{item.name}</span>
                                </div>
                                <div className={styles.itemInfo}>
                                    <h3>{item.name}</h3>
                                    <p className={styles.price}>Price: {item.price} EGP</p>
                                    <span className={styles.badge}>{item.category}</span>
                                </div>
                                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summary}>
                        <p className={styles.note}>
                            * الدفع والاستلام حاليا من خلال الفرع فقط * <br />
                            العنوان : شارع طه حسين امام النادي الرياضي , المنيا
                        </p>

                        <Link to="/contact" className={styles.contactBtn}>Contact</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
