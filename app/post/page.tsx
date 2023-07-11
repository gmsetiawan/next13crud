import FormCreatePost from "@/components/FormCreatePost";
import PostList from "@/components/PostList";
import { prisma } from "@/lib/db";
import Link from "next/link";
import React from "react";

const PostPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="relative max-w-2xl mx-auto py-10">
      <div className="flex flex-col gap-4">
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
};

export default PostPage;
