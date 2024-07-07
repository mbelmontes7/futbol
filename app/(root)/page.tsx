"use client";
import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,

} from '@clerk/nextjs';


export default function Home() {
  return (
    <div>
      <SignedIn>
        <div className="hero bg-teal-100 min-h-screen text-black font-bold">
          <div className="absolute top-4 right-7 ">
            {/* user buttton right here rendering and then send user to onboarding  */}

            {/* <UserButton /> */}
          </div>
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there </h1>
              <p className="py-6 text-li text-2xl text-green-600 font-bold">
                Thank you for joining us and being a part of this exciting project! 🎉🫶🏼
              </p>

              <button className="btn btn-outline bg-lime-200 text-black" onClick={() => { window.location.href = "/onboarding" }}>Onboard</button>
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        {/* This is my hero section */}
        <div className=" bg-gradient-to-r min-h-screen grainy from-green-200 to-teal-100 flex flex-col justify-center items-center relative">
          {/* Centered TypewriterTitle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="font-semibold text-3xl text-black">
              <TypewriterTitle />{" "}
              <span className="text-green-700 font-bold text-2xl">to make friends </span>
            </h1>
          </div>
          {/* Positioned Button on the button of the page but keeping it on the center.. So I added a div with a margin of 36 */}
          <div className=" mt-40">
            <Button className="rounded-xl text-1xl font-bold p-3 bg-green-200 text-green-800 border border-green-500 hover:bg-green-300 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out font-sans">
              <SignInButton />
            </Button>
          </div>

        </div>
      </SignedOut>
    </div>


  );
}
