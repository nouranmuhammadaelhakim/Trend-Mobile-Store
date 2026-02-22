const ADMIN_API_BASE = import.meta.env.VITE_ADMIN_API_URL || '';

const buildUrl = (path) => {
  if (!ADMIN_API_BASE) {
    return path;
  }

  return `${ADMIN_API_BASE}${path}`;
};

const parseError = async (response) => {
  try {
    const data = await response.json();
    return data?.error || 'Request failed.';
  } catch {
    return 'Request failed.';
  }
};

export const fetchProjects = async () => {
  const response = await fetch(buildUrl('/admin-api/projects'));

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = await response.json();
  return data.projects || [];
};

export const addProject = async ({ title, description, imageFile }) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description || '');

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await fetch(buildUrl('/admin-api/projects'), {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = await response.json();
  return data.project;
};

export const deleteProject = async (id) => {
  const response = await fetch(buildUrl(`/admin-api/projects/${id}`), {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return true;
};
