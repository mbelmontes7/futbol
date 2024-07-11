//this bottombar is going to be for moblie view only when the user is on the home page or is on  looking at the things the other people have posted
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";

function Bottombar() {
    const pathname = usePathname();

    return (
        <section className='bottombar'>
            <div className='bottombar_container'>
                {sidebarLinks.map((link) => {
                    const isActive =
                    //if the pathname includes the route and the route is greater than 1 or the pathname is equal to the route
                        (pathname.includes(link.route) && link.route.length > 1) ||
                        pathname === link.route;

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            //special bar for the bottom bar
                            className={`bottombar_link ${isActive && "bg-emerald-400 "}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={16}
                                height={16}
                                //this is the image that is being displayed on the bottom bar
                                className='object-contain'
                            />

                            <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                                {link.label.split(/\s+/)[0]}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

export default Bottombar;