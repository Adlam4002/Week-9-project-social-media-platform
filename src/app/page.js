import Image from "next/image";
import { SignInButton, SignUpButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
export default function Home() {
  const { userId } = auth();
  return (
    <main>
      <Link id="profilelink" href={`/user/${userId}`}>
        My profile
      </Link>
      <div id="mdiv" className="flex min-h-screen flex-col items-center p-16">
        <SignedOut>
          <SignUpButton>Sign up?</SignUpButton>{" "}
          <SignInButton>Sign in</SignInButton>
        </SignedOut>
        <SignedIn>
          <h3>
            Make sure you make your user profile before you try to make a post:{" "}
            <Link id="profilelink" href={`/user/${userId}`}>
              My profile
            </Link>
          </h3>
        </SignedIn>
        <h1>
          Welcome to ConnectHub – your new favorite spot for connecting,
          sharing, and discovering!
          <br /> At ConnectHub, we believe in the power of community. Our
          platform is designed to bring people together, foster meaningful
          connections, and spark engaging conversations. Whether you&apos;re
          here to catch up with friends, share your latest adventures, or
          discover new interests, ConnectHub is the place to be.
          <br /> Join a vibrant community where your voice matters. Share your
          thoughts, post photos and videos, and explore a world of content
          tailored just for you. Stay connected with those who matter most and
          meet new friends along the way.
          <br /> Ready to dive in? Create your profile, start sharing, and
          experience the magic of ConnectHub. Let&apos;s connect, share, and
          grow together! 🌟
          <br /> ConnectHub – Your World, Connected.
        </h1>
      </div>
    </main>
  );
}
// need at least 2 tables  users tbale(containing clerkId) and posts table(connected to users byu the clerkId--> foreign key) one to many one user has many posts. if i do likes, i need a third table for likes. if followers fetch goal need a juntion table for followerid and followeeid --> many to many one user can follow many users who can also follow many users
// when deploy add all env vars (clerk and database)
// if use
