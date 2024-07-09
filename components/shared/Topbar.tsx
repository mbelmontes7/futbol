//this topbar is going to be a navbar
import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";

function Topbar() {
  return (
    //I started by creating a nav tag and then I added a link tag to the home page 
    <nav className="topbar">
      <Link href='/' className='flex items-center gap-4'>
        <Image src='/futbol.svg' alt='logo' width={20} height={20} />
        <p className='text-heading3-bold max-xs:hidden text-1'>FutbolNet</p>
      </Link>
      <div className='flex items-center gap-1 ml-auto absolute right-8'>
        <div className="block md:hidden ">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer ">
                <Image src='/logout.svg' alt='logout' width={17} height={24} />
              </div>

            </SignOutButton>
          </SignedIn>


        </div>

        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}
export default Topbar;