
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import LeftSideBar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import { ClerkProvider } from "@clerk/nextjs";

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
        <body className={inter.className}>{children}
          <Topbar />

          <main>
            <LeftSideBar />
            {/* This is where is going to be mostly all the application code located*/}
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
