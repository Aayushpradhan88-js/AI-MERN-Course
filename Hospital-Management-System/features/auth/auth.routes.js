import express from 'express'
import { registerUser } from './auth.controller.js'
const authRouter = express.Router()

authRouter.post("/register", registerUser )
// authRouter.post("/login", )

export default authRouter