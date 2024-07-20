import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
export default function AppWelcome() {
  const { userId } = auth();
  return (
    <main className="flex flex-col my-auto mx-auto">
      <h1>Thanks for signing up, click the button to make your profile.</h1>
      <Link id="profilelink" href={`/user/${userId}`}>
        Make your profile!
      </Link>
    </main>
  );
}
