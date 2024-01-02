"use client"
import Loading from "@components/Loading";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import { useUserPosts } from "@hooks/useUserPosts";

const userProfile = ({ params }: { params: { id: string } }) => {
  const { posts, loading} = useUserPosts(params.id);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <>
      {loading ? 
        <Loading />
        :
        params.id && name && 
          <Profile
            name={name}
            desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`}
            data={posts}
          />
      }
    </>
  )
}

export default userProfile