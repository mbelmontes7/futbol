"use client";
import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'



export default function Home() {
  return (
    <div>
      <div className="bg-teal-100 from-green-100">
        <ClerkProvider>
          <SignedOut>
            <button
              className="rounded-xl text-1xl font-bold p-3 bg-green-200 text-green-800 border border-green-500 hover:bg-green-300 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out font-sans"

            >
              <SignInButton />
            </button>

          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ClerkProvider>
      </div>

      <div className="bg-gradient-to-r min-h-screen grainy from-green-200 to-teal-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-semibold text-3xl text-center">
            <TypewriterTitle /> <span className="text-green-600 font-bold">to make friends </span>{" "}
          </h1>
          <div className="mt-4"></div>
          <h2 className="font-semibold text-3xl text-center text-slate-700"></h2>
          <div className="mt-8"></div>
          <div className="flex justify-center">
            {/* <Link href="/Onbording"> */}
            {/* // <Button className="bg-green-600">
            //   Get Started
            //   <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
            // </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>

  );
}