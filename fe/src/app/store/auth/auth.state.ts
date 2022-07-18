export interface AuthState {
  token: string;
  username: string;
  expiresAt: string;
  signInFailedReason?: string;
  selectRegisterFailedReason?: string;
}
