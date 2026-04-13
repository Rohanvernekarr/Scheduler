import { Router } from 'express';
import { bookingController } from '../../controllers/bookings.js';

const bookingRouter: Router = Router();

bookingRouter.post('/', bookingController.createBooking.bind(bookingController));
bookingRouter.get('/host/:hostId', bookingController.getHostBookings.bind(bookingController));
bookingRouter.patch('/:id/cancel', bookingController.cancelBooking.bind(bookingController));

export { bookingRouter };
