"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
// import { auth } from "@clerk/nextjs/server";
export function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={isActive ? "text-orange-400" : ""}>
      {children}
    </Link>
  );
}

export default function Header({ href, children }) {
  // const { userId } = auth();
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <>
      <nav>
        <ActiveLink href="/">Home</ActiveLink> |{" "}
        <ActiveLink href="/user">About</ActiveLink>{" "}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </>
  );
}
