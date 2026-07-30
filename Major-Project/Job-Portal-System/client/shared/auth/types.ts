export type UserRole = "CANDIDATE" | "RECRUITER" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}
