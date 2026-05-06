import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { meetingRouter } from './routes/v1/meetings.js';
import { userRouter } from './routes/v1/users.js';
import { companyRouter } from './routes/v1/companies.js';
import { availabilityRouter } from './routes/v1/availability.js';
import { bookingRouter } from './routes/v1/bookings.js';
import { eventRouter } from './routes/v1/events.js';
import { interviewRouter } from './routes/v1/interviews.js';
import { inviteRouter } from './routes/v1/invites.js';
import { adminRouter } from './routes/v1/admin.js';
import notificationRouter from './routes/v1/notifications.js';
import { initCronJobs } from './services/cron.js';
import { initNotificationWorker } from './workers/notificationWorker.js';
import { errorHandler } from './middleware/error.js';
import { authMiddleware } from './middleware/auth.js';
import { auth } from '@repo/auth';
import { toNodeHandler } from "better-auth/node";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: [
    'http://localhost:3000', // Landing
    'http://localhost:5173', // Web
    'http://localhost:5174',
    'https://scheduler-kappa-teal.vercel.app',
    'https://scheduler-web-mu.vercel.app',
    'https://scheduler-9smh.onrender.com'
  ],
  credentials: true
}));
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Better Auth 
app.all(/^\/api\/auth\/.*/, toNodeHandler(auth));

// modular router
app.use('/api/v1/invites', (req, res, next) => {
  if ((req.method === 'GET' && !req.path.includes('/host/')) || (req.method === 'POST' && req.path === '/book')) {
    return next();
  }
  return authMiddleware(req, res, next);
}, inviteRouter);

// Apply auth middleware to all other v1 routes
app.use('/api/v1', authMiddleware);

// Mount modular routers
app.use('/api/v1/meetings', meetingRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/availability', availabilityRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/interviews', interviewRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/notifications', notificationRouter);

// Global Error Handler
app.use(errorHandler);

// Initialize Cron Jobs & Workers
initCronJobs();
initNotificationWorker();

app.listen(Number(port), '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${port}`);
});
