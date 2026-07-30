import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "./register.repository.ts";

export class RegistrationError extends Error {}

export async function registerUser(input: {
  email: string;
  password: string;
  role: "CANDIDATE" | "RECRUITER";
}) {
  const email = input.email.trim().toLowerCase();
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new RegistrationError("An account with this email already exists.");
  }

  const password = await bcrypt.hash(input.password, 12);
  const user = await createUser({ email, password, role: input.role });

  return { id: user.id, email: user.email, role: user.role };
}
