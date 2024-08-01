"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

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
}