import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

// export const dynamic = 'force-dynamic';
export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();
    const posts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 });

  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
}