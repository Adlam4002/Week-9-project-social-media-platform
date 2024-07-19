import { dbConnect } from "@/utils/dbConnection";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
export default async function AppPosts() {
  const { userId } = auth();
  const db = dbConnect();
  const posts = (await db.query(`SELECT * FROM socialmedia_posts`)).rows;
  return (
    <main>
      <Link href={`/user/${userId}`}>My profile</Link>
      {posts.map((item) => (
        <div key={item.id}>
          <h4>{item.username}</h4>
          <p>{item.post}</p>
          <Link href={`/view/${item.username}`}>
            <button>Profile</button>
          </Link>
        </div>
      ))}
    </main>
  );
}
