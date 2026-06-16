//register && /login

import { registerService } from "./auth.service.js"


// - { name, email, password(hash), role}

//register user
export const registerUser = (req, res) => {
    // const data = req.body;
    try {
        const user = registerService(req.body)
    
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