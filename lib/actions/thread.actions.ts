import { connectToDB } from "../mongoose"

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
  }
  
//   export async function createThread({ text, author, communityId, path }: Params
//   ) {
//     try {
//       connectToDB();
  
//       const communityIdObject = await Community.findOne(
//         { id: communityId },
//         { _id: 1 }
//       );
  
//       const createdThread = await Thread.create({
//         text,
//         author,
//         community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
//       });
  