import express from 'express';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';
import {createReceptionist, getAllPatientsAppointmentsRequests, updatePatientRequestStatus, assignDoctor} from './receptionist.controller.js';

const receptionistRouter = express.Router();

receptionistRouter.post('/', authenticate, restrictTo('receptionist', 'admin'), createReceptionist);
receptionistRouter.get('/patientsrequests', authenticate, getAllPatientsAppointmentsRequests);
receptionistRouter.put('/patientsrequests/:id/status', authenticate, updatePatientRequestStatus);
receptionistRouter.put('/patientsrequests/:id/assign', authenticate, assignDoctor);

export default receptionistRouter;
