"use client";
import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';

export default function Home() {
  return (
    <ClerkProvider>
      <SignedIn>
        {/* User is signed in */}
        <div className="flex flex-col justify-center items-center bg-teal-100 from-green-100">
          <UserButton />
        </div>

        <div className="flex flex-col items-center justify-center">
          Thanks for signing in.
          <Button
            className="mt-4"
            onClick={() => {
              window.location.href = "/onboarding";
            }}
          >
            Dashboard
          </Button>
        </div>
      </SignedIn>

      <SignedOut>
        {/* This is my hero section */}
        <div className=" bg-gradient-to-r min-h-screen grainy from-green-200 to-teal-100 flex flex-col justify-center items-center relative">
          {/* Centered TypewriterTitle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="font-semibold text-3xl">
              <TypewriterTitle />{" "}
              <span className="text-green-600 font-bold text-2xl">to make friends </span>
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
    </ClerkProvider>
  );
}
