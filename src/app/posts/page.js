import { dbConnect } from "@/utils/dbConnection";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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
  revalidatePath(`/posts`);
}
export default async function AppPosts() {
  const { userId } = auth();
  const db = dbConnect();
  const posts = (await db.query(`SELECT * FROM socialmedia_posts`)).rows;
  const response = await db.query(
    `
    SELECT * FROM socialmedia_users WHERE clerk_id = $1`,
    [userId]
  );
  const userData = response.rows;
  console.log(userData);
  return (
    <main>
      <Link id="profilelink" href={`/user/${userId}`}>
        My profile
      </Link>
      <form id="postform" action={handlePost}>
        <div className="flex flex-col">
          <input name="user" defaultValue={userId} hidden></input>
          <input
            name="username"
            defaultValue={userData[0].username}
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

      <div id="mdiv">
        {posts.map((item) => (
          <div key={item.id} id="posts">
            <h4 id="postname">{item.username}</h4>
            <p id="postbody">{item.post}</p>
            <Link href={`/view/${item.username}`} id="postbutton">
              <button>View profile</button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
