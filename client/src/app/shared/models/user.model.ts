export interface User {
  _id:string;
  email:string;
  company:string;
  firstName:string;
  lastName: string;
  role: [];
  phone: string;
  emailVerified: boolean;
  emailToken:string;
  passwordToken: string;
  passwordTokenExpiration: Date;
  password?:string;
}

export interface EmailModel {
  email:string,
}

export interface PasswordModel {
  password:string,
  id: string,
  token: string,
}

export interface SigninModel {
  email: string,
  password: string
}

export interface UserRoleModel {
  ROLE_USER: boolean,
  ROLE_ADMIN: boolean,
}
