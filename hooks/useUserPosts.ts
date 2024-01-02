import { PostWithIdType } from "@components/PostList";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const useUserPosts = (id: string | undefined) => {
  const [posts, setPosts] = useState<PostWithIdType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch(`/api/users/${id}/posts`);
        const data = await res.json() as PostWithIdType[];
        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (!id) {
      router.push("/");
    }
    else fetchPrompt();
  }, []);

  return { posts, setPosts, loading };
}