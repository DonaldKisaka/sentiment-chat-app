import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'User Email is Required'],
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;