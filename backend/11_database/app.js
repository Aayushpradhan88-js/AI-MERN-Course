import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectionDB } from './models/index.js';
import userRoute from './feature/user/user.route.js';
import postRouter from './feature/post/post.route.js';
const app = express();

app.use(express.json());

await connectionDB();

// Test route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/api/user', userRoute);
app.use('/api/post', postRouter);

app.listen(3900, () => {
    console.log('Server is running on port 3900');
});