// need a user table on db, (id, clerk id, username, bio, location, age)
//import clerk stuff
import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function handleSubmit(formData) {
  "use server";
  const name = formData.get("name");
  const db = dbConnect();
  await db.query(
    `INSERT INTO whateverusertableis (clerk_id, name) VALUES ($1)`,
    [name]
  );
  // this SQL is imcomplete, but its for adding userdata to the db
  // revalidate the path and redirect if i want
}
// need userId from clerk auth
export default async function UserIdPage() {
  const { userId } = auth();
  if (userId) {
    // SQL query to get the user's data
  }
  const userData = await currentUser();
  return (
    <main>
      <h1>Dynamic user page</h1>
      <h2>
        Welcome: {userData?.firstName}
        <br /> Signed in as: {userData?.emailAddresses}
      </h2>
    </main>
  );
}
