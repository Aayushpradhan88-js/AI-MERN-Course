import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import userRoute from './feature/user/user.route.js';
import postRoute from './feature/post/post.route.js'
import db from './models/index.js';

db.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to database:", err);
  });

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

app.get('/', (req, res) => {
  res.send('Express server is running on port 8000');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
