import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

const envPaths = ['.env.local', '.env'];
const cwd = process.cwd();

envPaths.forEach((envPath) => {
  dotenv.config({ path: path.resolve(cwd, envPath) });
});

const ADMIN_API_PORT = process.env.ADMIN_API_PORT || 4170;
const ADMIN_APP_ORIGIN = process.env.ADMIN_APP_ORIGIN || 'http://localhost:5173';
const RAW_STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_URL = RAW_STRAPI_API_URL.replace(/\/$/, '');
const STATIC_API_TOKEN = process.env.STATIC_API_TOKEN;

const tempDir = path.join(cwd, 'server', '.tmp');
fs.mkdirSync(tempDir, { recursive: true });

const upload = multer({ dest: tempDir });
const app = express();

app.use(cors({
  origin: ADMIN_APP_ORIGIN,
  methods: ['GET', 'POST', 'DELETE'],
}));

const ensureToken = (res) => {
  if (!STATIC_API_TOKEN) {
    res.status(500).json({ error: 'STATIC_API_TOKEN is not configured.' });
    return false;
  }

  return true;
};

const resolveImageUrl = (imageData) => {
  const url = imageData?.attributes?.url;

  if (!url) {
    return null;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `${STRAPI_API_URL}${url}`;
};

const mapProject = (project) => {
  if (!project) {
    return null;
  }

  const { id, attributes } = project;
  const imageData = attributes?.image?.data;

  return {
    id,
    title: attributes?.title || '',
    description: attributes?.description || '',
    imageUrl: resolveImageUrl(imageData),
  };
};

app.get('/admin-api/projects', async (_req, res) => {
  if (!ensureToken(res)) {
    return;
  }

  try {
    const response = await axios.get(`${STRAPI_API_URL}/api/projects?populate=image`, {
      headers: {
        Authorization: `Bearer ${STATIC_API_TOKEN}`,
      },
    });

    const projects = (response.data?.data || []).map(mapProject);
    res.json({ projects });
  } catch (error) {
    const message = error?.response?.data?.error?.message || error.message;
    res.status(error?.response?.status || 500).json({ error: message });
  }
});

app.post('/admin-api/projects', upload.single('image'), async (req, res) => {
  if (!ensureToken(res)) {
    return;
  }

  const cleanup = async () => {
    if (req.file?.path) {
      await fs.promises.unlink(req.file.path).catch(() => undefined);
    }
  };

  try {
    const title = (req.body?.title || '').trim();
    const description = (req.body?.description || '').trim();

    if (!title) {
      res.status(400).json({ error: 'Project title is required.' });
      return;
    }

    let imageId = null;

    if (req.file) {
      const form = new FormData();
      form.append('files', fs.createReadStream(req.file.path), req.file.originalname);

      const uploadResponse = await axios.post(`${STRAPI_API_URL}/api/upload`, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${STATIC_API_TOKEN}`,
        },
      });

      imageId = uploadResponse.data?.[0]?.id || null;
    }

    const payload = {
      data: {
        title,
        description,
      },
    };

    if (imageId) {
      payload.data.image = imageId;
    }

    const createResponse = await axios.post(`${STRAPI_API_URL}/api/projects?populate=image`, payload, {
      headers: {
        Authorization: `Bearer ${STATIC_API_TOKEN}`,
      },
    });

    res.status(201).json({ project: mapProject(createResponse.data?.data) });
  } catch (error) {
    const message = error?.response?.data?.error?.message || error.message;
    res.status(error?.response?.status || 500).json({ error: message });
  } finally {
    await cleanup();
  }
});

app.delete('/admin-api/projects/:id', async (req, res) => {
  if (!ensureToken(res)) {
    return;
  }

  try {
    await axios.delete(`${STRAPI_API_URL}/api/projects/${req.params.id}`, {
      headers: {
        Authorization: `Bearer ${STATIC_API_TOKEN}`,
      },
    });

    res.json({ success: true });
  } catch (error) {
    const message = error?.response?.data?.error?.message || error.message;
    res.status(error?.response?.status || 500).json({ error: message });
  }
});

app.listen(ADMIN_API_PORT, () => {
  console.log(`Admin API proxy listening on port ${ADMIN_API_PORT}`);
});
