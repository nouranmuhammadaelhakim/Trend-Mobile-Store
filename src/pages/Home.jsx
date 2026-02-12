import React, { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';
import { useData } from '../context/DataContext';
import styles from './Home.module.css';

const Home = () => {
    const newArrivalRef = useRef(null);
    const bestSellerRef = useRef(null);
    const { products, categories } = useData();

    const scrollLeft = (ref) => {
        ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = (ref) => {
        ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const featuredCategories = categories.slice(0, 6);
    const newArrivals = products.filter(p => p.isNew);
    const bestSellers = products.filter(p => p.isBestSeller);

    return (
        <div className={styles.home}>
            <Hero />

            {/* Featured Categories */}
            <section className="section-padding container">
                <SectionTitle
                    title="Featured Categories"
                    subtitle="Discover our wide range of mobile accessories"
                />
                <div className={styles.grid}>
                    {featuredCategories.map(cat => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))}
                </div>
            </section>

            {/* New Arrivals */}
            <section className="section-padding container">
                <div className={styles.headerWithControls}>
                    <SectionTitle title="New Arrival Products" />
                    <div className={styles.controls}>
                        {/* Horizontal scroll native usually doesn't need external controls for "New Arrival" per user request, 
                    but user said "scroll left and right to view". Native scrollbar is fine, or simple drag. 
                    I'll add buttons just in case or just let overflow-x handle it.
                    User: "user can scroll left and right to view the other items".
                    Usually implies swipe or scrollbar. I'll stick to overflow-x: auto.
                */}
                    </div>
                </div>

                <div className={styles.scrollContainer} ref={newArrivalRef}>
                    {newArrivals.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Best Seller */}
            <section className="section-padding container">
                <div className={styles.headerWithControls}>
                    <SectionTitle title="Best Seller" />
                    <div className={styles.controls}>
                        <button onClick={() => scrollLeft(bestSellerRef)}><FaArrowLeft /></button>
                        <button onClick={() => scrollRight(bestSellerRef)}><FaArrowRight /></button>
                    </div>
                </div>

                <div className={styles.scrollContainer} ref={bestSellerRef}>
                    {bestSellers.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <Banner
                title="UPGRADE YOUR PHONE EXPERIENCE"
                text="Get the best accessories for your device today."
            />
        </div>
    );
};

export default Home;
