"use server";

// Use a variable to conncet to the database the user 

import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function updateUser(): Promise<void> {
    connectToDB();
    await User.findOneAndUpdate()
}