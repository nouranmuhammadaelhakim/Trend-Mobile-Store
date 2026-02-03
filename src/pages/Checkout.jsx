import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '@clerk/clerk-react';
import { loadStripe } from '@stripe/stripe-js';
import styles from './Checkout.module.css';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    
    let user = null;
    let isSignedIn = false;
    
    try {
        const clerkUser = useUser();
        user = clerkUser.user;
        isSignedIn = clerkUser.isSignedIn;
    } catch (error) {
        // Clerk not configured
    }

    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState({
        email: user?.primaryEmailAddress?.emailAddress || '',
        fullName: user?.fullName || '',
        address: '',
        city: '',
        zipCode: '',
        country: ''
    });

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cartItems.length > 0 ? 10 : 0;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!isSignedIn) {
            alert('Please sign in to complete your purchase');
            return;
        }

        if (cartItems.length === 0) {
            alert('Your cart is empty');
            return;
        }

        setProcessing(true);

        try {
            // In a real implementation, you would:
            // 1. Create a checkout session on your backend
            // 2. Send cart items and customer info to your server
            // 3. Your server creates a Stripe checkout session
            // 4. Redirect to Stripe checkout

            // For now, we'll simulate the process
            console.log('Processing checkout with:', {
                items: cartItems,
                customer: formData,
                total
            });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In production, redirect to Stripe:
            // const stripe = await stripePromise;
            // const { error } = await stripe.redirectToCheckout({
            //     sessionId: session.id
            // });

            alert('Order placed successfully! (Demo mode - Stripe integration pending)');
            clearCart();
            navigate('/dashboard');
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Error processing checkout. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className={styles.checkout}>
                <div className={styles.container}>
                    <div className={styles.emptyCart}>
                        <h2>Your cart is empty</h2>
                        <p>Add some products to your cart before checking out</p>
                        <Link to="/" className={styles.shopButton}>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.checkout}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Checkout</h1>
                </div>

                <div className={styles.content}>
                    {/* Billing Information */}
                    <div className={styles.section}>
                        <h2>Billing Information</h2>
                        <form onSubmit={handleCheckout}>
                            <div className={styles.formGroup}>
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSignedIn}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>ZIP Code *</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Country *</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.checkoutButton}
                                disabled={processing}
                            >
                                {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className={styles.section}>
                        <div className={styles.orderSummary}>
                            <h3>Order Summary</h3>
                            {cartItems.map(item => (
                                <div key={item.id} className={styles.orderItem}>
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className={styles.orderItemImage}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/60';
                                        }}
                                    />
                                    <div className={styles.orderItemDetails}>
                                        <h4>{item.name}</h4>
                                        <p>Qty: {item.quantity} × ${item.price}</p>
                                    </div>
                                    <div>
                                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                    </div>
                                </div>
                            ))}

                            <div className={styles.totals}>
                                <div className={styles.totalRow}>
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Shipping:</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Tax:</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className={`${styles.totalRow} ${styles.grand}`}>
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
