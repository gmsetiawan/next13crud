"use client";

import { toast } from "@/hooks/use-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type PostListProps = {
  posts: any;
};

const PostList: FC<PostListProps> = ({ posts }) => {
  const router = useRouter();

  const deletePost = async (id: number) => {
    await axios.delete(`/api/post/${id}`).then(
      (response) => {
        console.log(response);
        toast({
          title: "Successfully",
          description: "You has been delete post",
        });
        router.refresh();
      },
      (error) => {
        console.log(error);
        if (error.message === "Request failed with status code 404") {
          toast({
            title: "Attention",
            description: "Contact developer",
            variant: "destructive",
          });
        }

        if (error.message === "Network Error") {
          toast({
            title: "Attention",
            description: "Check your connection",
            variant: "destructive",
          });
        }
      }
    );
  };
  return (
    <div className="flex flex-col gap-2">
      {posts.map((post: any) => (
        <div key={post.id} className="relative p-2 shadow rounded">
          <div className="absolute top-2 right-2 flex gap-4">
            <Link href={`/post/${post.id}`} className="text-sm">
              edit
            </Link>
            <button
              onClick={() => deletePost(post.id)}
              className="text-sm text-red-500"
            >
              Delete
            </button>
          </div>

          <p>{post.title}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
