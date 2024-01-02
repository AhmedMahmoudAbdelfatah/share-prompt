import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const revalidate = 0;
export const GET = async () => {
  try {
    await connectToDB();
    const posts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 });

  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
}