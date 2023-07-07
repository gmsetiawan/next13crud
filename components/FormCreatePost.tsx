"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidation } from "@/lib/validators/post";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormCreatePost = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const storePost = handleSubmit(async (data) => {
    await axios.post("/api/post", data).then(
      (response) => {
        console.log(response);
        toast({
          title: "Successfully",
          description: "You has been create new post use React Hook Form",
        });
        reset();
        router.push("/");
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
  });
  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={storePost}>
        <div className="flex flex-col gap-2">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("title")}
            />
            {errors.title && (
              <small className="text-red-600">{errors.title.message}</small>
            )}
          </div>
          <div>
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Content
            </label>
            <textarea
              id="content"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("content")}
            />
            {errors.content && (
              <small className="text-red-600">{errors.content.message}</small>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? "Progress" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCreatePost;
