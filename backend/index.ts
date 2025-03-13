import express from 'express';
import type { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.APP_PORT || 8000;

app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to ScienceHub LMS API' });
});

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`);
});