import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Basic structure for API routes
app.get('/api/meetings', (req: Request, res: Response) => {
  res.json({ data: [] });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
