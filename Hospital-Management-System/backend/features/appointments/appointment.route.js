import express from 'express';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';
import createAppointment, { getAppointmentsController, updateStatusController, markNotifiedController } from './appointment.controller.js';

const appointmentRouter = express.Router();

appointmentRouter.post('/', authenticate, restrictTo('patient', 'receptionist', 'admin'), createAppointment);

appointmentRouter.get('/', authenticate, getAppointmentsController);

appointmentRouter.put('/:id/status', authenticate, restrictTo('receptionist', 'admin', 'doctor'), updateStatusController);

appointmentRouter.put('/:id/mark-notified', authenticate, restrictTo('patient'), markNotifiedController);

export default appointmentRouter;
