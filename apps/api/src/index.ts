import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { meetingRouter } from './routes/v1/meetings.js';
import { userRouter } from './routes/v1/users.js';
import { companyRouter } from './routes/v1/companies.js';
import { availabilityRouter } from './routes/v1/availability.js';
import { bookingRouter } from './routes/v1/bookings.js';
import { eventRouter } from './routes/v1/events.js';
import { interviewRouter } from './routes/v1/interviews.js';

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
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/availability', availabilityRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/interviews', interviewRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
