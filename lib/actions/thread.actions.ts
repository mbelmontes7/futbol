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

 /*Imagine you have a list of posts, some of 
    which might be replies (children) to other posts (parents). 
    This code helps you:*/

// Count all the main posts (those without a parent).
// Get a specific set of these main posts.
// Check if there are more main posts left to be fetched after the current set.
// Return the current set of posts and information about whether more posts are available.