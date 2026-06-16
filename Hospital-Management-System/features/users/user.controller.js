import User from './user.model.js';

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role} = req.body;
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