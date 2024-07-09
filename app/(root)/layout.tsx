
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Topbar from "@/components/shared/Topbar";
import LeftSideBar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Futbolnet",
  description: "An app for futbol lovers developed by futbol lovers.",
  //adding an image to the top next to the title
  icons: {
    icon: "/futbol.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    // appearance={{
    //   baseTheme: dark,
    // }}
    >
      <html lang="en">
        <body className={inter.className}>
          {/* This is the topbar of the application*/}
          <Topbar />

          <main>
            <LeftSideBar />
            {/* This is where is going to be mostly all the application code located*/}
            <section className="main-container py-8">

              {/* //max-w-4xl not sure if i am going to need it later  */}
              <div className="w-full ">
                {children}
                <Bottombar />
              </div>
            </section>
            <RightSidebar />
          </main>

        </body>
      </html>
    </ClerkProvider>
  );
}
