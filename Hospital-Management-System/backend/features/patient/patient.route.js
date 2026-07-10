import express from 'express';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';
import createPatient, { getPatientsController, assignDoctorController } from './patient.controller.js';

const patientRouter = express.Router();

// patient role: fills their own profile
// admin role: creates patient + user account from scratch
patientRouter.post("/", authenticate, restrictTo('patient'), createPatient);

// receptionist and admin can view all patients
patientRouter.get("/", authenticate, restrictTo('receptionist', 'admin'), getPatientsController);

// receptionist can assign doctor
patientRouter.put("/:id/assign-doctor", authenticate, restrictTo('receptionist', 'admin'), assignDoctorController);

export default patientRouter;