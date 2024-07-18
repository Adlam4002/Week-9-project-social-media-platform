// need a user table on db, (id, clerk id, username, bio, location, age)
//import clerk stuff
import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import CreateForm from "@/components/CreateForm";

async function handleSubmit(formData) {
  "use server";
  const clerkId = formData.get("clerk_id");
  const username = formData.get("username");
  const bio = formData.get("bio");
  const location = formData.get("location");
  const age = formData.get("age");
  const db = dbConnect();
  await db.query(
    `INSERT INTO socialmedia_users (clerk_id, username, bio, location, age) VALUES ($1, $2, $3, $4, $5)`,
    [clerkId, username, bio, location, age]
  );
}
async function handlePost(formData) {
  "use server";
  const user = formData.get("user");
  const post = formData.get("post");
  const db = dbConnect();
  await db.query(
    `
    INSERT INTO socialmedia_posts ("user", post) 
    VALUES ($1, $2)
    `,
    [user, post]
  );
}
// need userId from clerk auth
export default async function UserIdPage() {
  const userData = await currentUser();
  const { userId } = auth();
  if (userId) {
    const db = dbConnect();
    await db.query(
      `
      SELECT * FROM socialmedia_users WHERE clerk_id = $1
        `,
      [userId]
    );
  }

  console.log(` userData = ${userData}`);
  return (
    <main>
      <h1>Dynamic user page</h1>
      {/* id, clerk id, username, bio, location, age */}
      <h2>
        Welcome: {userData?.firstName}
        <br /> Signed in as: {userData?.emailAddresses[0]?.emailAddress}
      </h2>
      <form
        action={handleSubmit}
        className="flex flex-col items-center p-28"
        id="createprofileform"
      >
        <input name="clerk_id" value={userData.id} hidden></input>
        <label htmlFor="username">Enter a username:</label>
        <input
          name="username"
          placeholder="Enter your username"
          required
        ></input>
        <div className="flex flex-col">
          <label htmlFor="bio">Enter your bio</label>

          <textarea
            className="resize"
            name="bio"
            required
            placeholder="Write your bio here!"
          ></textarea>
        </div>
        <label htmlFor="location">Your location?</label>
        <input
          name="location"
          required
          placeholder="Where are you from?"
        ></input>
        <label htmlFor="age">How old are you?</label>
        <input name="age" required placeholder="20?"></input>
        <button>Create profile</button>
      </form>
      <form className="flex flex-col items-center p-28" action={handlePost}>
        <div className="flex flex-col">
          <input name="user" defaultValue={userData.id} hidden></input>
          <label htmlFor="post">Enter your post</label>

          <textarea
            className="resize"
            name="post"
            required
            placeholder="Write your post here!"
          ></textarea>
        </div>
        <button>Post!</button>
      </form>
    </main>
  );
}

// include loading
