export default interface UserInterface {
    _id: string,
    email: string,
    name: string,
    emailToken: string,
    emailVerified: boolean,
    role: [],
    password: string,
    passwordToken: string | null,
    passwordTokenExpiration: Date | null,
}