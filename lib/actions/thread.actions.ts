"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { skip } from "node:test";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}
//users can create their own post and threads
export async function createThread({ text, author, communityId, path }: Params) {
    connectToDB();
    const createdThread = await Thread.create({
        text,
        author,
        community: null,
    });
    //update the user model with the new thread
    await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id },
    })
    revalidatePath(path);
}
//fetch the posts 
export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    //establish a connection to the database
    connectToDB();
    //calculate the number of posts to skip
    const skipAmount = pageSize * (pageNumber - 1);

    //Fetch the posts from the database adn that have no parents 

    const postQuery = Thread.find({ parentId: { $in: [null, undefined] } })

        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: 'User' })
        .populate({
            path: 'children',
            populate: {
                path: 'author', model: 'User',
                select: "_id name parentId image"
            }
        })
    const totalPosts = await Thread.countDocuments({
        parentId: {
            $in:
                [null, undefined]
        }
    });
    const posts = await postQuery.exec();

    const isNextPage = totalPosts > skipAmount + posts.length;
    return { posts, isNextPage };
}
//this is coming for thr thread id where you can see more about the post 
export async function fetchThreadById(threadId: string) {
    connectToDB();

    try {
        const thread = await Thread.findById(threadId)
            .populate({
                path: "author",
                model: User,
                select: "_id id name image",
            }) // Populate the author field with _id and username
            .populate({
                path: "community",
                //   model: Community,
                select: "_id id name image",
            }) // Populate the community field with _id and name
            .populate({
                path: "children", // Populate the children field
                populate: [
                    {
                        path: "author", // Populate the author field within children
                        model: User,
                        select: "_id id name parentId image", // Select only _id and username fields of the author
                    },
                    {
                        path: "children", // Populate the children field within children
                        model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
                        populate: {
                            path: "author", // Populate the author field within nested children
                            model: User,
                            select: "_id id name parentId image", // Select only _id and username fields of the author
                        },
                    },
                ],
            })
            // Execute the query
            .exec();

        return thread;
    } catch (err) {
        console.error("Error while fetching thread:", err);
        throw new Error("Unable to fetch thread");
    }
}
//this is the function that is going to add a comment to the thread

