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
// Define the updateUser function
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
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            //upsert is set to true to create a new user if it doesn't exist
            { upsert: true }
        );

        if (path === "/profile/edit") {
            // Revalidate the user's profile page
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}