import express from "express";
import cors from "cors";
import path from "path";
import apiRouter from "./server/routes.ts";
import { getDb } from "./server/db.ts";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Initialize DB
getDb().then(() => {
  console.log('Database initialized');
}).catch(err => {
  console.error('Failed to initialize database:', err);
});

// API Routes
app.use('/api/v1', apiRouter);

// Serve static files from the Vite build directory
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
