import mongoose, {Document, Model} from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        createIndexes: [true, 'email_used'],
        lowercase: true,
        validate: {
            validator: function(email:string) {
                return /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\.([a-zA-Z]{2,6})$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        nim: 8,
        validate: {
            validator: function(email:string) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9$/ \W]+$/.test(email);
            },
            message: props => `${props.value} is not a valid password!`
        }
    },
    role: []
});

export const User = mongoose.model('User', userSchema);