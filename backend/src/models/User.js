import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
        default: ''
    }
}, { timestamps: true }); // Adds createdAt & updatedAt automatically

// Create or reuse the model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;