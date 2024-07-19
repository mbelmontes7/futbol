"use server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AccountProfile from "@/components/forms/AccountProfile";

// Define an interface for userInfo
interface UserInfo {
  _id?: string;
  username?: string;
  name?: string;
  bio?: string;
  image?: string;
}

// Define the Page component as an async function
async function Page() {
  // Fetch the current user asynchronously
  const user = await currentUser();

  // If user is null, redirect to the sign-in page
  if (!user) {
    redirect("/sign-in");
    return null; // Add this return to avoid further execution
  }

  // Placeholder for userInfo object, can be fetched from a database or an API
  const userInfo: UserInfo = {};

  // Prepare userData object with user and userInfo details
  const userData = {
    id: user.id,
    objectId: userInfo?._id || "", // Ensure objectId is always a string
    username: userInfo?.username || user.username || "", // Ensure username is always a string
    name: userInfo?.name || user.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user.imageUrl,
  };

  return (
    // Main content of the application
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now, to use FutbolNet
      </p>
      {/* The section of the document for the Account Profile */}
      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
  );
}

export default Page;
