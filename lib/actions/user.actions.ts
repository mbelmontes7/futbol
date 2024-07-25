"use server";

import { revalidatePath } from "next/cache";
// Use a variable to conncet to the database the user 

import User from "../models/user.model";
import { connectToDB } from "../mongoose";

// Connect to the database using the connectToDB function
interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}
// Define the updateUser function a function is like a recipe that takes in ingredients and produces a result
export async function updateUser({
    userId,
    bio,
    name,
    path,
    username,
    image,
}: Params): Promise<void> {
    connectToDB();
    try {
        //passing parameters to the User model
        await User.findOneAndUpdate(
            { id: userId },
            //applying the changes to the user modelb 
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            //upsert is a combination of update and insert which means if the user is not found it will create a new user (for example if the user is not found in the database)
            { upsert: true }
        );

        if (path === "/profile/edit") {
            // Revalidate the user's profile page this is useful when the user updates their profile
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}

export async function fetchUser(userId: string){
    try {
        connectToDB();
        return await User
        .findOne({ id: userId })
        // .populate({
        //     path: "communities",
        //     model: "Community",
        // });




        //fetch the user from the database
    } catch (error:any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
}
}