export interface User {
  _id:string;
  email:string;
  name:string;
  role: [];
  emailVerified: boolean;
  emailToken:string;
  passwordToken: string;
  passwordTokenExpiration: Date;
  password?:string;
}
