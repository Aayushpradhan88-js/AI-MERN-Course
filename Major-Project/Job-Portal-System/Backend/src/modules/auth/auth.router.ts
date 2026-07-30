import { Router } from "express";
import loginRouter from "./login/login.route.ts";
// import logoutRouter from "./logout/logout.route.ts";
import registerRouter from "./register/register.route.ts";

const authRouter = Router();

authRouter.use("/register", registerRouter);
authRouter.use("/login", loginRouter);
// authRouter.use("/logout", logoutRouter);

export default authRouter;
