import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import { addProject, deleteProject, fetchProjects } from '../../services/adminProjectsApi';
import styles from './AdminProjects.module.css';

const initialFormState = {
  title: '',
  description: '',
  imageFile: null,
};

const AdminProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [formState, setFormState] = useState(initialFormState);
  const [fileInputKey, setFileInputKey] = useState(0);

  const imagePreview = useMemo(() => {
    if (!formState.imageFile) {
      return '';
    }

    return URL.createObjectURL(formState.imageFile);
  }, [formState.imageFile]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const showMessage = (type, text) => {
    setStatusMessage({ type, text });
  };

  const loadProjects = async () => {
    setIsLoading(true);

    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      showMessage('error', error.message || 'Unable to load projects.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const [file] = event.target.files || [];

    setFormState((prev) => ({
      ...prev,
      imageFile: file || null,
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setFileInputKey((prev) => prev + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formState.title.trim()) {
      showMessage('error', 'Project title is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      await addProject({
        title: formState.title.trim(),
        description: formState.description.trim(),
        imageFile: formState.imageFile,
      });

      showMessage('success', 'Project added successfully.');
      resetForm();
      await loadProjects();
    } catch (error) {
      showMessage('error', error.message || 'Unable to add project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      showMessage('success', 'Project deleted successfully.');
    } catch (error) {
      showMessage('error', error.message || 'Unable to delete project.');
    }
  };

  return (
    <div className={styles.adminProjects}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1>Project Management</h1>
            <p>Upload and manage projects shown on the website.</p>
          </div>
          <button className={styles.backButton} onClick={() => navigate('/admin')}>
            <FaArrowLeft />
            Back to Dashboard
          </button>
        </header>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Add a Project</h2>
            <p>Create a new project entry with a title, description, and image.</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <label className={styles.formGroup}>
                <span>Project Title</span>
                <input
                  type="text"
                  name="title"
                  value={formState.title}
                  onChange={handleInputChange}
                  placeholder="New product launch"
                  required
                />
              </label>

              <label className={styles.formGroup}>
                <span>Project Description</span>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleInputChange}
                  placeholder="Briefly describe the project impact and highlights."
                  rows={4}
                />
              </label>

              <label className={styles.formGroup}>
                <span>Project Image</span>
                <input
                  key={fileInputKey}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              {imagePreview && (
                <div className={styles.preview}>
                  <img src={imagePreview} alt="Project preview" />
                </div>
              )}
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Project...' : 'Add Project'}
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={resetForm}
                disabled={isSubmitting}
              >
                Clear
              </button>
            </div>
          </form>
        </section>

        {statusMessage && (
          <div className={`${styles.message} ${styles[statusMessage.type]}`}>
            {statusMessage.text}
          </div>
        )}

        <section className={styles.listSection}>
          <div className={styles.listHeader}>
            <h2>Projects</h2>
            <p>{projects.length} total</p>
          </div>

          {isLoading ? (
            <div className={styles.loadingState}>Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No projects yet</h3>
              <p>Add a project to start building your showcase.</p>
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {projects.map((project) => (
                <article key={project.id} className={styles.projectCard}>
                  <div className={styles.imageWrapper}>
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} />
                    ) : (
                      <div className={styles.imagePlaceholder}>No image</div>
                    )}
                  </div>
                  <div className={styles.projectBody}>
                    <h3>{project.title}</h3>
                    <p>{project.description || 'No description provided.'}</p>
                  </div>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDelete(project.id)}
                  >
                    <FaTrash />
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminProjects;
