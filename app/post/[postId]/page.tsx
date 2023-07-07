import FormEditPost from "@/components/FormEditPost";
import { prisma } from "@/lib/db";
import { equal } from "assert";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    postId: number;
  };
}

const PostEdit = async ({ params }: PageProps) => {
  const { postId } = params;

  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
  });

  if (!post) return notFound();

  return (
    <div className="relative max-w-2xl mx-auto py-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold uppercase">
          This is store post using react-hook-form
        </h1>
        <FormEditPost post={post} />
      </div>
    </div>
  );
};

export default PostEdit;
