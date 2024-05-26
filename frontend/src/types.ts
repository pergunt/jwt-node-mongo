
export interface User {
  id: string;
  email: string;
  activated: boolean;
}

export interface AuthResponse {
  user: User
}
