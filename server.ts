import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { graphql } from 'graphql';
import { schema, rootResolver } from './server/graphqlSchema.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // GraphQL Endpoint for API communication (Syllabus: Node.js + GraphQL)
  app.post('/graphql', async (req, res) => {
    const { query, variables, operationName } = req.body;
    if (!query) {
      return res.status(400).json({ errors: [{ message: 'GraphQL query is required.' }] });
    }

    try {
      const response = await graphql({
        schema,
        source: query,
        rootValue: rootResolver,
        variableValues: variables,
        operationName,
      });
      res.json(response);
    } catch (err: any) {
      res.status(500).json({ errors: [{ message: err.message || 'GraphQL execution failed.' }] });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'RecipeNest',
      stack: 'Node.js Express + GraphQL + React + Redux + React Router',
      timestamp: new Date().toISOString(),
    });
  });

  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[RecipeNest] Node.js + GraphQL server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[RecipeNest] Server startup error:', err);
  process.exit(1);
});
