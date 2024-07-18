import Image from "next/image";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <SignedOut>
        <SignUpButton>Sign up?</SignUpButton>{" "}
        <SignInButton>Sign in</SignInButton>
      </SignedOut>
      <h1>Test homepage</h1>
    </main>
  );
}
