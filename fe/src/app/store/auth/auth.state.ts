export interface AuthState {
  token: string;
  username: string;
  id: number;
  expiresAt: string;
  signInFailedReason?: string;
  registerFailedReason?: string;
}
