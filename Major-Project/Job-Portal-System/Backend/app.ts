import cors from "cors";
import express, { type Request, type Response } from "express";
// import { env } from "./src/config/env.js";
import authRouter from "./src/modules/auth/auth.router.ts";

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  credentials: true
}));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running on port 5000");
});

app.use("/api/auth", authRouter);



const PORT=5000
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
