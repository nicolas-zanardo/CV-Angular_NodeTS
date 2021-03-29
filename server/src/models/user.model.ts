import mongoose, {Document, Model} from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String
});

export const User = mongoose.model('User', userSchema);