import express from 'express';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';
import createAppointment, { getAppointmentsController, updateStatusController } from './appointment.controller.js';

const appointmentRouter = express.Router();

appointmentRouter.post('/', authenticate, restrictTo('patient', 'receptionist', 'admin'), createAppointment);

appointmentRouter.get('/', authenticate, getAppointmentsController);

appointmentRouter.put('/:id/status', authenticate, restrictTo('receptionist', 'admin'), updateStatusController);

export default appointmentRouter;
