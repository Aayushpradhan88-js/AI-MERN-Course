//register && /login

import { loginService, registerService } from "./auth.service.js"


// - { name, email, password(hash), role}

//register user
export const registerUser = async (req, res) => {
    // const data = req.body;
    try {
        const { user } = await registerService(req.body)

        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: {
                user
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

//login user
export const loginUser = async (req, res) => {
    try {
        const { accessToken, refreshToken, user } = await loginService(req.body)

        //refresh token in cookie for security

        
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     sameSite: 'strict',
        //     maxAge: '7 * 24 * 60 * 60 * 1000' //7D
        // })

        return res.status(200).json({
            success: true,
            message: "login successful",
            data: {
                user,
                accessToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}