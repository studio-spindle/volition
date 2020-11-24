export class Register {
  static readonly type = '[AuthState] Register';
  constructor(public payload: { username: string; password: string }) {}
}

export class Login {
  static readonly type = '[AuthState] Login';
  constructor(public payload: { username: string; password: string }) {}
}

export class Logout {
  static readonly type = '[AuthState] Logout';
}
