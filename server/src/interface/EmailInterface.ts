export default interface EmailInterface {
    from?: string,
    to?: string,
    subject?: string,
    host?: string,
    metaData: {
        email?: string,
        userId?:string,
        name?:string,
        url?:string,
        token?:string,
    }
}