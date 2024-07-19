"use server";
import { auth } from "@clerk/nextjs/server";
import ProfileLink from "./ProfileLink";
export default async function getUserId() {
  const { userId } = auth();
  return (
    <>
      <ProfileLink userId={userId} />
    </>
  );
}
