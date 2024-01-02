import { PostWithIdType } from "@components/PostList";
import { useEffect, useState } from "react";

export const useAllPosts = () => {
  const [posts, setPosts] = useState<PostWithIdType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch("/api/post", { cache: "no-cache" });
        const data = await res.json() as PostWithIdType[];
        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrompt();
    
  }, []);

  return { posts, loading };
}