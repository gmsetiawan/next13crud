import { prisma } from "@/lib/db";
import { PostValidation } from "@/lib/validators/post";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const posts = await prisma.post.findMany({});
  return new NextResponse(JSON.stringify(posts), { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = PostValidation.parse(body);
    const store = await prisma.post.create({
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
