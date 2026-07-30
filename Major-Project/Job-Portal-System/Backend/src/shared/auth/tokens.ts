import jwt from "jsonwebtoken";
import { env } from "../../config/env.ts";

export interface TokenPayload {
  sub: string;
  email: string;
  role: "CANDIDATE" | "RECRUITER" | "ADMIN";
}

export function createTokens(payload: TokenPayload) {
  return {
    accessToken: jwt.sign(payload, env.accessTokenSecret, { expiresIn: "15m" }),
    refreshToken: jwt.sign(payload, env.refreshTokenSecret, { expiresIn: "7d" }),
  };
}
