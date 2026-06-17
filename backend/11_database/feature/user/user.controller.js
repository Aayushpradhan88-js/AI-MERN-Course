import User from './user.model.js';
import Post from '../post/post.model.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            data: {
                users
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
};

export const createUser = async (req, res) => {
    try {
        const { email, name, age, password } = req.body;
        console.log(email, name, age)
        if (!email || !name || !age) {
            return res.status(401).json({
                message: "All fields are required"
            })
        }

        //email validation
        const checkEmail = await User.findOne({
            where: {email}
        })

        if(age => 20) {
            console.log("youre age is lower then 20, ")
        }

        const user = await User.create({
            email,
            name,
            age,
        });
        console.log("user", user);
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "unable to create user"
            })
        }

        res.status(201).json({
            succes: true,
            message: "user created successfully",
            data: {
                user
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, age } = req.body;

        const user = await User.update(
            { name, email, age },
            { where: { id } },
        );
        console.log(user)

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error });
    }
};

//TODO: DELETE GARNE TRY GARNEE WITH POSTMAN API 
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await User.destroy({ where: { id } });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};
