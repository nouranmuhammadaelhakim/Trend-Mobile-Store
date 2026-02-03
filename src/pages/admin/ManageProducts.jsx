import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTimes } from 'react-icons/fa';
import { useData } from '../../context/DataContext';
import { createProduct, updateProduct, deleteProduct } from '../../services/strapi';
import styles from './ManageProducts.module.css';

const ManageProducts = () => {
    const navigate = useNavigate();
    const { products, categories, usingStrapiData, refreshData } = useData();
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        oldPrice: '',
        image: '',
        description: '',
        stock: '',
        isNew: false,
        isBestSeller: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            category: '',
            price: '',
            oldPrice: '',
            image: '',
            description: '',
            stock: '',
            isNew: false,
            isBestSeller: false
        });
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || '',
            category: product.category || '',
            price: product.price || '',
            oldPrice: product.oldPrice || '',
            image: product.image || '',
            description: product.description || '',
            stock: product.stock || '',
            isNew: product.isNew || false,
            isBestSeller: product.isBestSeller || false
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!usingStrapiData) {
            alert('Strapi is not configured. Please set up Strapi to add/edit products.');
            return;
        }

        try {
            const productData = {
                name: formData.name,
                category: formData.category,
                price: parseFloat(formData.price),
                oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
                image: formData.image,
                description: formData.description,
                stock: parseInt(formData.stock) || 0,
                isNew: formData.isNew,
                isBestSeller: formData.isBestSeller
            };

            if (editingProduct) {
                await updateProduct(editingProduct.id, productData);
                alert('Product updated successfully!');
            } else {
                await createProduct(productData);
                alert('Product created successfully!');
            }

            setShowModal(false);
            refreshData();
        } catch (error) {
            alert('Error saving product: ' + error.message);
        }
    };

    const handleDelete = async (productId) => {
        if (!usingStrapiData) {
            alert('Strapi is not configured. Cannot delete products from mock data.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(productId);
                alert('Product deleted successfully!');
                refreshData();
            } catch (error) {
                alert('Error deleting product: ' + error.message);
            }
        }
    };

    return (
        <div className={styles.manageProducts}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Manage Products</h1>
                    <button 
                        className={styles.backButton}
                        onClick={() => navigate('/admin')}
                    >
                        <FaArrowLeft />
                        Back to Dashboard
                    </button>
                </div>

                <div className={styles.actions}>
                    <button 
                        className={styles.addButton}
                        onClick={openAddModal}
                    >
                        <FaPlus />
                        Add New Product
                    </button>
                </div>

                {products.length === 0 ? (
                    <div className={styles.emptyState}>
                        <h2>No Products Yet</h2>
                        <p>Start by adding your first product</p>
                        <button className={styles.addButton} onClick={openAddModal}>
                            <FaPlus />
                            Add Product
                        </button>
                    </div>
                ) : (
                    <div className={styles.productsGrid}>
                        {products.map(product => (
                            <div key={product.id} className={styles.productCard}>
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className={styles.productImage}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/280x200?text=No+Image';
                                    }}
                                />
                                <div className={styles.productInfo}>
                                    <h3>{product.name}</h3>
                                    <p>{product.category}</p>
                                    <p className={styles.price}>${product.price}</p>
                                    {product.oldPrice && (
                                        <p style={{ textDecoration: 'line-through', color: '#999' }}>
                                            ${product.oldPrice}
                                        </p>
                                    )}
                                    {product.description && (
                                        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                            {product.description.substring(0, 100)}...
                                        </p>
                                    )}
                                </div>
                                <div className={styles.cardActions}>
                                    <button 
                                        className={styles.editButton}
                                        onClick={() => openEditModal(product)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showModal && (
                    <div className={styles.modal} onClick={() => setShowModal(false)}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                <button 
                                    className={styles.closeButton}
                                    onClick={() => setShowModal(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label>Product Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Category *</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.title}>
                                                {cat.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Price *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        min="0"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Old Price (Optional)</label>
                                    <input
                                        type="number"
                                        name="oldPrice"
                                        value={formData.oldPrice}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        min="0"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Image URL *</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/image.jpg"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Product description..."
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        min="0"
                                    />
                                </div>

                                <div className={styles.checkboxGroup}>
                                    <input
                                        type="checkbox"
                                        name="isNew"
                                        checked={formData.isNew}
                                        onChange={handleInputChange}
                                        id="isNew"
                                    />
                                    <label htmlFor="isNew">Mark as New Arrival</label>
                                </div>

                                <div className={styles.checkboxGroup}>
                                    <input
                                        type="checkbox"
                                        name="isBestSeller"
                                        checked={formData.isBestSeller}
                                        onChange={handleInputChange}
                                        id="isBestSeller"
                                    />
                                    <label htmlFor="isBestSeller">Mark as Best Seller</label>
                                </div>

                                <div className={styles.formActions}>
                                    <button type="submit" className={styles.submitButton}>
                                        {editingProduct ? 'Update Product' : 'Add Product'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className={styles.cancelButton}
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProducts;
