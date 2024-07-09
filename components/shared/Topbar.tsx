// This topbar is going to be a navbar
import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";

function Topbar() {
  return (
    // I started by creating a nav tag and then I added a link tag to the home page 
    <nav className="topbar relative flex items-center px-4 py-2">
      <Link href='/' className='flex items-center gap-4'>
        <Image src='/futbol.svg' alt='logo' width={20} height={20} />
        <p className='text-heading3-bold text-light-5 text-xl max-xs:hidden'>Futbolnet</p>
      </Link>
      <div className='absolute right-8 flex items-center gap-4'>
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
        <div className="flex items-center">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer ">
                <Image src='/logout.svg' alt='logout' width={24} height={24} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;

