import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest, {params}: {params: {id: string}}) => {
  try {
    await connectToDB();
    const posts = await Prompt.find({ creator: params.id }).populate('creator');

    return new Response(JSON.stringify(posts), { status: 201 });

  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
}