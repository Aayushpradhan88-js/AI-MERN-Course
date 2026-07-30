export function logoutUser() {
  // Tokens are stored client-side; logout is completed by clearing that session.
  return { message: "Logged out successfully." };
}
