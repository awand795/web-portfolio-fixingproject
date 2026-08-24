import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Pool } = pg;

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_dev_fallback';

// Connection pool to Aiven PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '25789', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'defaultdb',
  ssl: {
    rejectUnauthorized: false
  },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Helper for CORS response headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

function jsonResponse(statusCode: number, data: any) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(data)
  };
}

// Verify JWT token from Authorization header
function verifyAdmin(authHeader?: string): { username: string } | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    return decoded;
  } catch (err) {
    return null;
  }
}

export const handler = async (event: any, context: any) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  // Check if DB credentials exist
  const dbHost = process.env.DB_HOST;
  const dbPassword = process.env.DB_PASSWORD;

  if (!dbHost || !dbPassword) {
    return jsonResponse(500, {
      error: 'Environment Variables Database belum diset di Netlify. Harap tambahkan DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME di Netlify Site Settings.'
    });
  }

  // Normalize path
  let path = event.path || '';
  path = path.replace('/.netlify/functions/api', '').replace('/api', '');
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  const method = event.httpMethod;
  let client: any = null;

  try {
    client = await pool.connect();

    // ----------------------------------------------------
    // AUTH ROUTES
    // ----------------------------------------------------
    if (path === '/auth/login' && method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const { username, password } = body;

      if (!username || !password) {
        return jsonResponse(400, { error: 'Username dan password wajib diisi' });
      }

      const userRes = await client.query(
        'SELECT * FROM admin_users WHERE username = $1',
        [username.toLowerCase().trim()]
      );

      if (userRes.rows.length === 0) {
        return jsonResponse(401, { error: 'Username atau password salah' });
      }

      const user = userRes.rows[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return jsonResponse(401, { error: 'Username atau password salah' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return jsonResponse(200, {
        message: 'Login berhasil',
        token,
        user: { id: user.id, username: user.username }
      });
    }

    if (path === '/auth/me' && method === 'GET') {
      const admin = verifyAdmin(event.headers.authorization || event.headers.Authorization);
      if (!admin) {
        return jsonResponse(401, { error: 'Unauthorized' });
      }
      return jsonResponse(200, { user: admin });
    }

    // ----------------------------------------------------
    // ADMIN POSTS ROUTES (Requires Admin Token)
    // ----------------------------------------------------
    if (path === '/admin/posts' && method === 'GET') {
      const admin = verifyAdmin(event.headers.authorization || event.headers.Authorization);
      if (!admin) {
        return jsonResponse(401, { error: 'Unauthorized' });
      }

      const result = await client.query(
        'SELECT * FROM posts ORDER BY created_at DESC'
      );
      return jsonResponse(200, { posts: result.rows });
    }

    // ----------------------------------------------------
    // PUBLIC POSTS ROUTES
    // ----------------------------------------------------
    if (path === '/posts' && method === 'GET') {
      const q = event.queryStringParameters?.q || '';
      const tag = event.queryStringParameters?.tag || '';

      let query = 'SELECT id, title, slug, summary, cover_image, tags, views, created_at FROM posts WHERE published = true';
      const params: any[] = [];

      if (q) {
        params.push(`%${q}%`);
        query += ` AND (title ILIKE $${params.length} OR summary ILIKE $${params.length})`;
      }

      if (tag) {
        params.push(tag);
        query += ` AND $${params.length} = ANY(tags)`;
      }

      query += ' ORDER BY created_at DESC';

      const result = await client.query(query, params);
      return jsonResponse(200, { posts: result.rows });
    }

    // GET /posts/:slug
    if (path.startsWith('/posts/') && method === 'GET') {
      const slug = path.replace('/posts/', '');
      
      // Increment views and get post
      const updateRes = await client.query(
        'UPDATE posts SET views = views + 1 WHERE slug = $1 AND published = true RETURNING *',
        [slug]
      );

      if (updateRes.rows.length === 0) {
        // Check if admin is previewing an unpublished post
        const admin = verifyAdmin(event.headers.authorization || event.headers.Authorization);
        if (admin) {
          const adminCheck = await client.query('SELECT * FROM posts WHERE slug = $1', [slug]);
          if (adminCheck.rows.length > 0) {
            return jsonResponse(200, { post: adminCheck.rows[0] });
          }
        }
        return jsonResponse(404, { error: 'Artikel tidak ditemukan' });
      }

      return jsonResponse(200, { post: updateRes.rows[0] });
    }

    // ----------------------------------------------------
    // POST /posts (Create Post - Admin Only)
    // ----------------------------------------------------
    if (path === '/posts' && method === 'POST') {
      const admin = verifyAdmin(event.headers.authorization || event.headers.Authorization);
      if (!admin) {
        return jsonResponse(401, { error: 'Unauthorized' });
      }

      const body = JSON.parse(event.body || '{}');
      const { title, slug, summary, content, cover_image, tags, published } = body;

      if (!title || !content) {
        return jsonResponse(400, { error: 'Judul dan konten wajib diisi' });
      }

      const cleanSlug = (slug || title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const result = await client.query(
        `INSERT INTO posts (title, slug, summary, content, cover_image, tags, published, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         RETURNING *`,
        [title, cleanSlug, summary || '', content, cover_image || '', tags || [], published ?? true]
      );

      return jsonResponse(201, { message: 'Postingan berhasil dibuat', post: result.rows[0] });
    }

    // ----------------------------------------------------
    // PUT /posts/:id (Update Post - Admin Only)
    // ----------------------------------------------------
    if (path.startsWith('/posts/') && method === 'PUT') {
      const admin = verifyAdmin(event.headers.authorization || event.headers.Authorization);
      if (!admin) {
        return jsonResponse(401, { error: 'Unauthorized' });
      }

      const id = parseInt(path.replace('/posts/', ''), 10);
      const body = JSON.parse(event.body || '{}');
      const { title, slug, summary, content, cover_image, tags, published } = body;

      const cleanSlug = (slug || title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const result = await client.query(
        `UPDATE posts 
         SET title = $1, slug = $2, summary = $3, content = $4, cover_image = $5, tags = $6, published = $7, updated_at = NOW()
         WHERE id = $8
         RETURNING *`,
        [title, cleanSlug, summary || '', content, cover_image || '', tags || [], published ?? true, id]
      );

      if (result.rows.length === 0) {
        return jsonResponse(404, { error: 'Artikel tidak ditemukan' });
      }

      return jsonResponse(200, { message: 'Postingan berhasil diperbarui', post: result.rows[0] });
    }

    // ----------------------------------------------------
    // DELETE /posts/:id (Delete Post - Admin Only)
    // ----------------------------------------------------
    if (path.startsWith('/posts/') && method === 'DELETE') {
      const admin = verifyAdmin(event.headers.authorization || event.headers.Authorization);
      if (!admin) {
        return jsonResponse(401, { error: 'Unauthorized' });
      }

      const id = parseInt(path.replace('/posts/', ''), 10);
      const result = await client.query('DELETE FROM posts WHERE id = $1 RETURNING id', [id]);

      if (result.rows.length === 0) {
        return jsonResponse(404, { error: 'Artikel tidak ditemukan' });
      }

      return jsonResponse(200, { message: 'Postingan berhasil dihapus' });
    }

    return jsonResponse(404, { error: 'Route not found' });
  } catch (err: any) {
    console.error('API Error:', err);
    return jsonResponse(500, { error: 'Internal Server Error', details: err.message });
  } finally {
    if (client) client.release();
  }
};
