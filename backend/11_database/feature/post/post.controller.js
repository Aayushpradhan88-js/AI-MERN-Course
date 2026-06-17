import Post from './post.model.js';
import User from '../user/user.model.js';

//Create

export const createPost = async(req, res) => {
    try {
        const { title, content, userId } = req.body
        if (!title || !content || !userId) {
            return res.status(401).json({
                message: "Please fill all the fields"
            })
        }

        //DB CALL
        const userNewPost = await Post.create({
            title,
            content,
            userId
        })
        if (!userNewPost) {
            return res.status(500).json({
                message: "failed to create post"
            })
        }

        return res.status(200).json({
            success: true,
            message: "You're post is published",
            data: {
                userNewPost
            }
        })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.findAll();
          if (!posts) {
            return res.status(500).json({
                success: false,
                message: "unable to create posts"
            })
        }

        res.status(200).json({
            data: {
                posts
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error });
    }
};

//TODO: POST KO UPDATE & DELETE

//UPDATE
//{id} - params
// tile content = req.body
// Post.findByPk(id)

//DELETE
// Post.destroy