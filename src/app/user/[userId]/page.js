// need a user table on db, (id, clerk id, username, bio, location, age)
//import clerk stuff
import { dbConnect } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import CreateForm from "@/components/CreateForm";

async function handleSubmit(formData) {
  "use server";
  const { userId } = auth();
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
  revalidatePath(`/user/${userId}`);
}
async function handlePost(formData) {
  "use server";
  const { userId } = auth();
  const user = formData.get("user");
  const post = formData.get("post");
  const username = formData.get("username");
  console.log(
    `Inserting post for user: ${user}, username: ${username}, post: ${post}`
  );
  const db = dbConnect();
  await db.query(
    `
    INSERT INTO socialmedia_posts ("user", post, username) 
    VALUES ($1, $2, $3)
    `,
    [user, post, username]
  );
  revalidatePath(`/user/${userId}`);
}
// need userId from clerk auth
export default async function UserIdPage() {
  const db = dbConnect();
  const userData = await currentUser();
  const { userId } = auth();
  const testQuery = await db.query(
    ` SELECT * FROM socialmedia_users WHERE clerk_id = $1
        `,
    [userId]
  );
  const userEntries = testQuery.rows[0];
  console.log(`userEntries = ${testQuery.rows[0].username}`);
  if (userEntries) {
    await db.query(
      `
      SELECT * FROM socialmedia_users WHERE clerk_id = $1
        `,
      [userId]
    );
    const username = testQuery.rows[0].username;
    const result = await db.query(
      `
          SELECT * FROM socialmedia_posts WHERE username = $1
          `,
      [username]
    );
    const posts = result.rows;
    console.log(` userData = ${userData.username}`);
    return (
      <main id="mdiv">
        {/* id, clerk id, username, bio, location, age */}
        <h2>
          Welcome {userData?.firstName}
          <br /> Signed in as: {userData?.emailAddresses[0]?.emailAddress}
        </h2>
        {/* <div className="flex">
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
          <div id="current-info" className="flex flex-col"></div>
        </div> */}
        <form id="postform" action={handlePost}>
          <div className="flex flex-col">
            <input
              name="user"
              defaultValue={userEntries.clerk_id}
              hidden
            ></input>
            <input
              name="username"
              defaultValue={testQuery.rows[0].username}
              hidden
            ></input>
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
        <div>
          {posts.map((item) => (
            <div key={item.id} id="posts">
              <h4 id="postname">{item.username}</h4>
              <p id="postbody">{item.post}</p>
            </div>
          ))}
        </div>
      </main>
    );
  } else
    return (
      <main>
        <div className="flex">
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
              defaultValue={userEntries.username}
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
          <div id="current-info" className="flex flex-col"></div>
        </div>
      </main>
    );
}

// include loading
// maybe toast when forms submitted
