import PostList from "@/components/PostList";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="relative max-w-2xl mx-auto py-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-xl font-semibold">Post Page</h1>
        <Link
          href="/post/create"
          className="w-32 p-2 rounded bg-cyan-600 hover:bg-cyan-400 text-center text-sm text-white"
        >
          Create Post
        </Link>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
