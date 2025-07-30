import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        required: [true, 'User Name is Required'],
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'User Email is Required'],
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
}, { timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;