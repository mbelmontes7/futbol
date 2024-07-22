import mongoose from "mongoose";
//this is the schema for the User model in the database

const userSchema = new mongoose.Schema({
    // Define the schema for the User model
    id: {
        type: String,
        required: true,
    },
    //this is the username of the user
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: String,
    bio: String,
    //the user can have many threads
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread",
        },
    ],
    //here is where we store the user's email
    onboarded: {
        type: Boolean,
        default: false,
    },
    //one user can be a member of many communities
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community",
        },
    ],
});
//export the User model 
//the User model is created using the userSchema
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;