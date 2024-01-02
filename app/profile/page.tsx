"use client"
import Loading from "@components/Loading";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUserPosts } from "@hooks/useUserPosts";


const MyProfile = () => {
  const { data: session } = useSession();
  const { posts, setPosts, loading } = useUserPosts(session?.user.id);
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/update-post?id=${id}`);
  }

  const handleDelete = async (id: string) => {
    try {
      const isConfirmed = confirm("Are you sure you want to delete this post?");
      if (isConfirmed) {
        await fetch(`api/post/${id}`, { method: "DELETE" });

        setPosts((prev) => {
          return prev.filter((post) => id !== post._id);
        });
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {loading ? 
        <Loading />
        :
        session?.user && 
          <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
      }
    </>
  )
}

export default MyProfile