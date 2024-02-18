import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  SignInButton,
  UserButton,
  auth,
} from "@clerk/nextjs";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  return (
    <html lang="en">
      <body className={`w-screen h-screen ${inter.className} bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400`}>        <ConvexClientProvider>
          <ClerkLoading>
            <div className="w-full h-full flex justify-center items-center bg-[#fff]">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <div className="w-screen h-screen flex flex-col">
              <nav className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-white px-4 py-3">
                <div className="container mx-auto flex justify-between items-center">
                  <a href="/" className="text-lg font-semibold justify-start">
                    Calendare
                  </a>
                  <div className="flex items-center space-x-4">
                    <a href="/" className="hover:text-gray-300">
                      Home
                    </a>
                    <a href="/goals" className="hover:text-gray-300">
                      Goals
                    </a>
                    <a href="/mainCalendar" className="hover:text-gray-300">
                      Calendar
                    </a>
                    <a href="/daily" className="hover:text-gray-300">
                      Daily
                    </a>
                    <a href="/profile" className="hover:text-gray-300">
                      Profile
                    </a>
                    {userId ? (
                      <div className="flex items-center space-x-4">
                        <div className="hover:text-gray-300">
                          <UserButton />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-4">
                        <a href="#" className="hover:text-gray-300">
                          <SignInButton />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </nav>
              {children}
            </div>
          </ClerkLoaded>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
