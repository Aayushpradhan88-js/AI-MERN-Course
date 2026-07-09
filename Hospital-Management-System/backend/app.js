import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors'
import { connectionDB } from './config/index.js';
import authRouter from './features/auth/auth.routes.js';
import doctorRouter from './features/doctor/doctor.route.js';
import patientRouter from './features/patient/patient.route.js';
import departmentRouter from './features/deparments/department.route.js';
import doctorDepartmentRouter from './features/doctorDepartment/doctorDepartment.route.js';
import appointmentRouter from './features/appointments/appointment.route.js';
import receptionistRouter from './features/receptionist/receptionist.route.js';

const app = express();

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     if (req.method === 'OPTIONS') return res.sendStatus(200);
//     next();
// });

//cors setup
// app.use(cors()) //sabaai request laai accept garneee

app.use(cors({
    origin: 'http://localhost:5173',
    credientals:true,
}))

app.use(express.json());

await connectionDB();

app.use("/api/auth", authRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/patient", patientRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/doctor-departments', doctorDepartmentRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/receptionists', receptionistRouter);


// Test route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(5900, () => {
    console.log('Server is running on port 5900');
});