import express from 'express';
import { createDoctor, getAllDoctors } from './doctor.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const doctorRouter = express.Router();

// Only admin and doctor should be allowed to create a doctor
doctorRouter.post("/", authenticate, restrictTo('doctor'), createDoctor);

// Any authenticated user can get all doctors
doctorRouter.get("/", authenticate, getAllDoctors);

export default doctorRouter;