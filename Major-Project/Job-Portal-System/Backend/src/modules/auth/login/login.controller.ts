import type { Request, Response } from "express";
import { z } from "zod";
import { LoginError, loginUser } from "./login.service.ts";

const loginSchema = z.object({
   email: z.string().trim().email(),
    password: z.string().min(1)
   });

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    return res.status(200).json(await loginUser(parsed.data));
  } catch (error) {
    if (error instanceof LoginError) {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({ message: "Unable to log in." });
  }
}
