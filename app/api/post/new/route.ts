import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPost = new Prompt({
      creator: userId,
      prompt,
      tag
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new post", { status: 500 });
  }
}