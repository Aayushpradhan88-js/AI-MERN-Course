import { Router } from "express";
import { login } from "./login.controller.ts";

const loginRouter = Router();
loginRouter.post("/", login);

export default loginRouter;
