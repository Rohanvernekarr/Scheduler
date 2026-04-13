import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { meetingRouter } from './routes/v1/meetings.js';
import { userRouter } from './routes/v1/users.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Mount modular routers
app.use('/api/v1/meetings', meetingRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
