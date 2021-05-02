export default interface UsersInterface {
    _id: string,
    name: string,
    email: string,
    emailToken: string,
    emailVerified: boolean,
    password: string,
    passwordToken: string,
    passwordTokenExpiration: string,
    role: [string]
}