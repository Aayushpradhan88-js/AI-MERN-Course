//register && /login

import { loginService, registerService } from "./auth.service.js"


// - { name, email, password(hash), role}

//register user
export const registerUser = async (req, res) => {
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
        console.error("Error in registerUser:", error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "internal server error"
        })
    }
}

//login user
export const loginUser = async (req, res) => {
    try {
        const { accessToken, refreshToken, user } = await loginService(req.body)

        return res.status(200).json({
            success: true,
            message: "login successful",
            data: {
                user,
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}