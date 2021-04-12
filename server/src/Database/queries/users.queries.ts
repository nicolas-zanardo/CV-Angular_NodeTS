import {User} from "../models/user.model";

export const findUserPerId = (id: string) => {
    return User.findById(id).exec();
};

export const findUserPerEmail = (email: string) => {
    return User.findOne({"email": email}).exec();
}