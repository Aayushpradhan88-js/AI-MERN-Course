import express from 'express';
import { createDoctor, getAllDoctors, getMyProfile, approveDoctor } from './doctor.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const doctorRouter = express.Router();

// Doctor fetches their own profile
doctorRouter.get("/my-profile", authenticate, restrictTo('doctor'), getMyProfile);

// Admin approves a doctor
doctorRouter.put("/:id/approve", authenticate, restrictTo('admin'), approveDoctor);

// Only doctor role can create their own profile
doctorRouter.post("/", authenticate, restrictTo('doctor'), createDoctor);

// Any authenticated user can get all doctors
doctorRouter.get("/", authenticate, getAllDoctors);

export default doctorRouter;