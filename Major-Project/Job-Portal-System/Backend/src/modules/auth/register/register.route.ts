import { Router } from "express";
import { register } from "./register.controller.ts";

const registerRouter = Router();
registerRouter.post("/", register);

export default registerRouter;
