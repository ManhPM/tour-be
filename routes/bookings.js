import express from 'express';
import { createBooking, getAllBooking, getDetailBooking, cancelBooking } from '../controllers/bookingController.js';
import { verifyUser, verifyToken } from '../utils/authenticate.js';
import { checkDateBooking } from '../utils/checkCreate.js';
const router = express.Router();

router.post('/', verifyToken, verifyUser, checkDateBooking, createBooking);
router.get('/:id', verifyToken, getDetailBooking);
router.get('/', verifyToken, getAllBooking);
router.post('/cancel/:id', verifyToken, cancelBooking);

export default router;
