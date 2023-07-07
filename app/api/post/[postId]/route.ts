import { prisma } from "@/lib/db";
import { PostValidation } from "@/lib/validators/post";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const postId = req.url.split("/post/")[1];
    const post = await prisma.post.findFirst({ where: { id: Number(postId) } });
    if (!post) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export async function PUT(req: Request) {
  try {
    const postId = req.url.split("/post/")[1];
    const body = await req.json();
    const { title, content } = PostValidation.parse(body);
    const store = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title: title,
        content: content,
      },
    });
    return new NextResponse(JSON.stringify(store), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 422 });
    }
    return new Response("Could not create post", { status: 500 });
  }
}

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const postId = req.url.split("/post/")[1];
    const post = await prisma.post.delete({ where: { id: Number(postId) } });
    if (!post) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
