import PostList from "@/components/PostList";
import { prisma } from "@/lib/db";
import React from "react";

export default async function Discuss() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="h-screen">
      <div className="relative max-w-2xl mx-auto py-10">
        <div className="flex flex-col gap-4">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}
