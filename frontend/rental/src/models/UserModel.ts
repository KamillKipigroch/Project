export interface IUser {
  firstName: string;
  lastName: string;
  userRole: string;
  email: string;
  locked: boolean;
  username: string;
}

export interface IUserLock {
  firstName: string;
  lastName: string;
  email: string;
}