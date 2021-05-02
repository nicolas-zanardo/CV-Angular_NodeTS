export interface JwtToken {
  isAuthenticated: boolean;
  token: string | boolean;
  role: string[];
  isUser: boolean;
  isAdmin: boolean;
}
