// Import necessary modules and components
import { currentUser } from "@clerk/nextjs/server";

// Import Clerk's currentUser function to get the authenticated user
import AccountProfile from "@/components/forms/AccountProfile"; // Import the AccountProfile component


async function Page() {
  // Fetch the current user asynchronously
  const user = await currentUser();
  // Placeholder for userInfo object, can be fetched from a database or an API
  const userInfo = {};

  // Prepare userData object with user and userInfo details
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username, // Use userInfo's username or fallback to user's username
    name: userInfo?.name || user?.firstName || "", // Use userInfo's name or fallback to user's firstName or an empty string
    bio: userInfo?.bio || "", // Use userInfo's bio or an empty string
    image: userInfo?.image || user?.imageUrl, // Use userInfo's image or fallback to user's imageUrl
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
        <AccountProfile user={userData} btnTitle='Continue' /> {/* Render the AccountProfile component with userData and a button title */}
      </section>
    </main>
  );
}

export default Page;

