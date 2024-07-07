//this topbar is going to be a navbar
import Link from "next/link";
import Image from "next/image";

function Topbar() {
  return (
    //I started by creating a nav tag and then I added a link tag to the home page 
    <nav className="topbar">
      <Link href='/' className='flex items-center gap-4'>
        <Image src='/futbol.svg' alt='logo' width={26} height={28} />
        <p className='text-heading3-bold text-light-1 max-xs:hidden text-2xl'>FutbolNet</p>
      </Link>
    </nav>
  );
}
export default Topbar;