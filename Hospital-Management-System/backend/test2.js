import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import axios from 'axios';
import sequelize from './config/connection.js';
import User from './features/users/user.model.js';

const test = async () => {
    await sequelize.authenticate();
    const user = await User.findOne({ where: { roles: 'patient' } });
    if (!user) {
        console.log("No patient found, using admin");
        const admin = await User.findOne();
        if (!admin) {
             console.log("No users found");
             process.exit(1);
        }
        var targetUser = admin;
    } else {
        var targetUser = user;
    }

    const token = jwt.sign({ id: targetUser.id, roles: targetUser.roles }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });

    try {
        const docRes = await axios.get('http://localhost:5900/api/doctors', { headers: { Authorization: `Bearer ${token}` } });
        console.log("Doctors SUCCESS:", Array.isArray(docRes.data) ? docRes.data.length : docRes.data);
    } catch (e) {
        console.log("Doctors FAILED:", e.response?.status, e.response?.data || e.message);
    }

    try {
        const depRes = await axios.get('http://localhost:5900/api/departments', { headers: { Authorization: `Bearer ${token}` } });
        console.log("Departments SUCCESS:", !!depRes.data.data.departments);
    } catch (e) {
        console.log("Departments FAILED:", e.response?.status, e.response?.data || e.message);
    }

    try {
        const appRes = await axios.get('http://localhost:5900/api/appointments', { headers: { Authorization: `Bearer ${token}` } });
        console.log("Appointments SUCCESS:", !!appRes.data.data.appointments);
    } catch (e) {
        console.log("Appointments FAILED:", e.response?.status, e.response?.data || e.message);
    }

    process.exit(0);
}

test();
