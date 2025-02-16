"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";

type Props = {};

function Header({}: Props) {
  const { isSignedIn } = useUser();
  

  return (
    <div className="p-5 border-b shadow-sm">
      <div className="flex items-center justify-between">
        <Image src={"/logo.svg"} width={50} height={50} alt="Logo" />
        {isSignedIn ? (
          <div className="flex items-center space-x-4">
           <Link href={'/dashboard'}>
           <Button variant={'outline'}>Dashboard</Button>
           </Link>
            <UserButton />
          </div>
        ) : (
          <div>
            <SignInButton>
              <Button>Get Started</Button>
            </SignInButton>
            </div>
        )}
      </div>
    </div>
  );
}

export default Header;
