"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import getUserId from "@/components/UserAuth";
// import { auth } from "@clerk/nextjs/server";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import ProfileLink from "./ProfileLink";
// import { auth } from "@clerk/nextjs/server";
export function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} id="navbut" className={isActive ? "text-orange-400" : ""}>
      {children}
    </Link>
  );
}

export default function Header({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <>
      <nav>
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/posts">Posts</ActiveLink>
        <ActiveLink href="/userlist">User List</ActiveLink>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </>
  );
}
