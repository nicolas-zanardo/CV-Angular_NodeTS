export default interface EmailInterface {
    to: string,
    subject: string,
    metaData: {
        name:string
    }
}