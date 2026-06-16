import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectionDB } from './config/index.js';
import authRouter from './features/auth/auth.routes.js';
const app = express();

app.use(express.json());

await connectionDB();

app.use("/api/auth", authRouter)

// Test route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(5900, () => {
    console.log('Server is running on port 5900');
});