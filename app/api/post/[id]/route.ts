import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

//GET to read the post
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const post = await Prompt.findById(params.id).populate('creator');
    if (!post) return new Response("Post not found", { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });

  } catch (error) {
    return new Response("Failed to fetch the post", { status: 500 });
  }
}

//PATCH to update the post
export const PATCH = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const { prompt, tag } = await request.json();
    
    const currPost = await Prompt.findById(params.id);
    if (!currPost) return new Response("Post not found", { status: 404 });

    currPost.prompt = prompt;
    currPost.tag = tag;
    await currPost.save();

    return new Response(JSON.stringify(currPost), { status: 200 });

  } catch (error) {
    return new Response("Failed to update the post", { status: 500 });
  }
}


//DELETE to delete the post
export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);
    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the post", { status: 500 });
  }
}