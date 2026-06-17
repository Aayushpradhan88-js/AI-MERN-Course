import express from 'express';
import {
  getAllPost,
  // updatePost,
  createPost,
  // deletePost
} from './post.controller.js';

const postRouter = express.Router();

// Post routes
postRouter.get('/', getAllPost);
postRouter.post('/', createPost);
// postRouter.put('/:id', updatePost);
// postRouter.delete('/:id', deletePost);

export default postRouter