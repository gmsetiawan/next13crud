import FormCreatePost from "@/components/FormCreatePost";
import React from "react";

const CreatePost = () => {
  return (
    <div className="relative max-w-2xl mx-auto py-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold uppercase">
          This is store post using react-hook-form
        </h1>
        <FormCreatePost />
      </div>
    </div>
  );
};

export default CreatePost;
