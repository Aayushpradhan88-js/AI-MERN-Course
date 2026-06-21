import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../users/user.model.js'


export const registerService = async ({ name, email, password, roles }) => {
    if (!name || !email || !password) {
        throw {
            status: 400,
            message: "Name, email, and password are required"
        };
    }

    // Step 1: Check if email is already registered
    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw {
            status: 400,
            message: "Email is already registered"
        };
    }

    const genSalt = 10;
    const hashPassword = await bcrypt.hash(password, genSalt);

    const user = await User.create({
        name,
        email,
        password: hashPassword,
        roles: roles || 'patient'
    });

    const userData = user.toJSON();
    delete userData.password;
    delete userData.refreshToken;

    return {
        user: userData
    };
}

//loginService
export const loginService = async ({ email, password }) => {
    if (!email || !password) {
        throw {
            status: 400,
            message: "Email and password are required"
        };
    }

    // Validate if the email is registered
    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        throw {
            status: 401,
            message: "Please check your email or password"
        };
    }

    // Validate password
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
        throw {
            status: 401,
            message: "Please check your email or password"
        };
    }

    // Generate access token (using user.roles instead of undefined user.role)
    const accessToken = jwt.sign(
        {
            id: user.id,
            role: user.roles
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    // Save refresh token to the database
    user.refreshToken = refreshToken;
    await user.save();

    // Prepare user response without password and refresh token
    const userData = user.toJSON();
    delete userData.password;
    delete userData.refreshToken;

    return {
        accessToken,
        refreshToken,
        user: userData
    };
}