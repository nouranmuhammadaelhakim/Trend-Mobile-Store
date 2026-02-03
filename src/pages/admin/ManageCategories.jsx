import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTimes } from 'react-icons/fa';
import { useData } from '../../context/DataContext';
import { createCategory, updateCategory, deleteCategory } from '../../services/strapi';
import styles from './ManageProducts.module.css'; // Reusing the same styles

const ManageCategories = () => {
    const navigate = useNavigate();
    const { categories, usingStrapiData, refreshData } = useData();
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        icon: '',
        link: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const openAddModal = () => {
        setEditingCategory(null);
        setFormData({
            title: '',
            image: '',
            icon: '',
            link: ''
        });
        setShowModal(true);
    };

    const openEditModal = (category) => {
        setEditingCategory(category);
        setFormData({
            title: category.title || '',
            image: category.image || '',
            icon: category.icon || '',
            link: category.link || ''
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!usingStrapiData) {
            alert('Strapi is not configured. Please set up Strapi to add/edit categories.');
            return;
        }

        try {
            const categoryData = {
                title: formData.title,
                image: formData.image,
                icon: formData.icon,
                link: formData.link || `/category/${formData.title.toLowerCase().replace(/\s+/g, '-')}`
            };

            if (editingCategory) {
                await updateCategory(editingCategory.id, categoryData);
                alert('Category updated successfully!');
            } else {
                await createCategory(categoryData);
                alert('Category created successfully!');
            }

            setShowModal(false);
            refreshData();
        } catch (error) {
            alert('Error saving category: ' + error.message);
        }
    };

    const handleDelete = async (categoryId) => {
        if (!usingStrapiData) {
            alert('Strapi is not configured. Cannot delete categories from mock data.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(categoryId);
                alert('Category deleted successfully!');
                refreshData();
            } catch (error) {
                alert('Error deleting category: ' + error.message);
            }
        }
    };

    return (
        <div className={styles.manageProducts}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Manage Categories</h1>
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
                        Add New Category
                    </button>
                </div>

                {categories.length === 0 ? (
                    <div className={styles.emptyState}>
                        <h2>No Categories Yet</h2>
                        <p>Start by adding your first category</p>
                        <button className={styles.addButton} onClick={openAddModal}>
                            <FaPlus />
                            Add Category
                        </button>
                    </div>
                ) : (
                    <div className={styles.productsGrid}>
                        {categories.map(category => (
                            <div key={category.id} className={styles.productCard}>
                                <img 
                                    src={category.image} 
                                    alt={category.title}
                                    className={styles.productImage}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/280x200?text=No+Image';
                                    }}
                                />
                                <div className={styles.productInfo}>
                                    <h3>{category.title}</h3>
                                    <p>{category.link}</p>
                                </div>
                                <div className={styles.cardActions}>
                                    <button 
                                        className={styles.editButton}
                                        onClick={() => openEditModal(category)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(category.id)}
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
                                <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
                                <button 
                                    className={styles.closeButton}
                                    onClick={() => setShowModal(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label>Category Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
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
                                    <label>Icon (optional)</label>
                                    <input
                                        type="text"
                                        name="icon"
                                        value={formData.icon}
                                        onChange={handleInputChange}
                                        placeholder="Icon name or code"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Category Link</label>
                                    <input
                                        type="text"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        placeholder="/category/category-name"
                                    />
                                    <small style={{ color: '#666', fontSize: '0.85rem' }}>
                                        Leave empty to auto-generate from title
                                    </small>
                                </div>

                                <div className={styles.formActions}>
                                    <button type="submit" className={styles.submitButton}>
                                        {editingCategory ? 'Update Category' : 'Add Category'}
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

export default ManageCategories;
