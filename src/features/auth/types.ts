export interface AuthError {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
}

export interface AuthState {
  error?: AuthError;
  success?: string;
}
