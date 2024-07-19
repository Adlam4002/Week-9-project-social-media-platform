import { dbConnect } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
export default async function AppUserName({ params }) {
  const { userId } = auth();
  const username = params.user;
  const db = dbConnect();
  const result = await db.query(
    `
        SELECT * FROM socialmedia_posts WHERE username = $1
        `,
    [username]
  );

  const posts = result.rows;
  console.log(posts[0].username);
  const response = await db.query(
    `
  SELECT * FROM socialmedia_users WHERE username = $1
  `,
    [posts[0].username]
  );
  const userInfo = response.rows[0];

  return (
    <main>
      <Link id="profilelink" href={`/user/${userId}`}>
        My profile
      </Link>
      <div id="mdiv">
        <div id="profilebox">
          <h1>User: {userInfo?.username}</h1>
          <h4>
            Age: {userInfo?.age} Location: {userInfo?.location}
          </h4>
          <p>{userInfo?.bio}</p>
        </div>
        {posts.map((item) => (
          <div key={item.id} id="posts">
            <h4 id="postname">{item.username}</h4>
            <p id="postbody">{item.post}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
