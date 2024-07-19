import Image from "next/image";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
export default function Home() {
  const { userId } = auth();
  return (
    <main>
      <Link id="profilelink" href={`/user/${userId}`}>
        My profile
      </Link>
      <div id="mdiv" className="flex min-h-screen flex-col items-center p-24">
        <SignedOut>
          <SignUpButton>Sign up?</SignUpButton>{" "}
          <SignInButton>Sign in</SignInButton>
        </SignedOut>
        <h1>Test homepage</h1>
      </div>
    </main>
  );
}
// need at least 2 tables  users tbale(containing clerkId) and posts table(connected to users byu the clerkId--> foreign key) one to many one user has many posts. if i do likes, i need a third table for likes. if followers fetch goal need a juntion table for followerid and followeeid --> many to many one user can follow many users who can also follow many users
// when deploy add all env vars (clerk and database)
// if use
