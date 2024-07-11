"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {/* //this is the sidebar that will be displayed on the left side of the screen 
        coming from the index file where is map over all the index is a simple array of objects */}
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              //this is where the link is being created and the link is being passed the route and the label
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && " bg-emerald-400 "}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              {/* //this is the label that is being displayed on the sidebar */}
              <p className=' text-green-200 max-lg:hidden'>{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className='mt-10 px-6'>
        {/* //this is the signout button that is being displayed on the sidebar
        Do I want this link to go*/}
        <SignedIn>
          <SignOutButton redirectUrl="/sign-in">
            <div className='flex cursor-pointer gap-4 p-4'>
              <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />
              <p className=' text-green-300 text-body-bold  max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;