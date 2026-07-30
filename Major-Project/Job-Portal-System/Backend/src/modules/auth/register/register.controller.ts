import type { Request, Response } from "express";
import { z } from "zod";
import { RegistrationError, registerUser } from "./register.service.ts";

const registerSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
  role: z.enum(["CANDIDATE", "RECRUITER"]),
});

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid registration data." });
  }

  try {
    const user = await registerUser(parsed.data);
    return res.status(201).json({ user });
  } catch (error) {
    if (error instanceof RegistrationError) {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: "Unable to create account." });
  }
}
