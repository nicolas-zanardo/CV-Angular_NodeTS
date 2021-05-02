import mongoose, {Schema} from "mongoose";

const userSchema = new mongoose.Schema({
    company: {
        type:String,
        lowercase: true,
        required: true,
        max: 250
    },
    firstName: {
        type:String,
        lowercase: true,
        max: 250
    },
    lastName: {
        type:String,
        lowercase: true,
        required: true,
        max: 250
    },
    phone: {
        type: String,
        max: 250,
        min: 10,
        validate: {
            validator: function(phone:string) {
                return /^()?((\+)?[0-9]+)?$/.test(phone);
            },
            message: props => `${props.value} is not a valid number phone!`
        }
    },
    email: {
        type: String,
        required: true,
        createIndexes: [true, 'email_used'],
        lowercase: true,
        max: 250,
        validate: {
            validator: function(email:string) {
                return /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\.([a-zA-Z]{2,6})$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    emailToken: { type: String, max: 250 },
    emailVerified: { type: Boolean, default: false, max: 250},
    password: {
        type: String,
        required: true,
        nim: 8,
        max: 250,
        validate: {
            validator: function(password:string) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9_$\/ \W]+$/.test(password);
            // ^\w((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))(?=.*\W)[a-zA-Z0-9_$/ \W]+$
            },
            message: props => `${props.value} is not a valid password!`
        }
    },
    passwordToken: {type: String, max:250},
    passwordTokenExpiration: {type: Date},
    role: []
});

export const User = mongoose.model('User', userSchema);