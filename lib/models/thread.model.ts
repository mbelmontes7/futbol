import mongoose from "mongoose";
//one thread can have multiple children this is recursion in action
//This creates a structure where threads can keep nesting inside each other, like a conversation with replies to replies to replies.
const threadSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true, // Every thread must have text
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This refers to a User who created the thread
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community", // This refers to a Community where the thread is posted
    },
    createdAt: {
        type: Date,
        default: Date.now, // This sets the date and time when the thread was created
    },
    parentId: {
        type: String, // This is the ID of the parent thread, if this is a reply
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread", // This refers to child threads or replies to this thread
        },
    ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
