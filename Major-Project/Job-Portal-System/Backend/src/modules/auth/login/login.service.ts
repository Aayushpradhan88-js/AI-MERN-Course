import bcrypt from "bcryptjs";
import { createTokens } from "../../../shared/auth/tokens.ts";
import { findUserForLogin } from "./login.repository.ts";

export class LoginError extends Error { }

export async function loginUser(input: { email: string; password: string }) {
  const user = await findUserForLogin(input.email.trim().toLowerCase());

  if (!user || user.status !== "ACTIVE" || !(await bcrypt.compare(input.password, user.password))) {
    throw new LoginError("Invalid email or password.");
  }

  const publicUser = {
    id: user.id,
    name: user.candidateProfile?.fullname ?? null,
    email: user.email,
    role: user.role,
  };

  return {
    user: publicUser,
    ...createTokens({
      sub: user.id,
      email: user.email,
      role: user.role
    })
  };
}
