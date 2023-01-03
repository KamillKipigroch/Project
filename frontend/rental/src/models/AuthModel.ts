export interface IUserLoginForm {
  email: string;
  password: string;
}

export interface IUserRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IToken {
  accessToken: string;
}

export interface IDecodedToken {
  rol: string[];
  name: string;
  preferred_username: string;
  email: string;
  user_id: number;
}