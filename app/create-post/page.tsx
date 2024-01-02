'use client'

import Form, { PostType } from "@components/Form"
import { FormEvent, useEffect, useState } from "react"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from "@components/Loading"

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<PostType>({
    prompt: "",
    tag: ""
  });
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) router.push('/');
  }, [session]);

  const createPost = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          ...post,
          userId: session?.user.id
        })
      });
      if (res.ok) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  const onTagChange = (tag: string) => {
    setPost((post) => {
      return { ...post, tag };
    });
  }
  const onPromptChange = (prompt: string) => {
    setPost((post) => {
      return { ...post, prompt };
    });
  }

  return (
    <>
      {status === "loading" ?
        <Loading />
        :
        status === 'authenticated' ?
          <Form
            type="Create"
            post={post}
            onPromptChange={onPromptChange}
            onTagChange={onTagChange}
            submitting={submitting}
            handleSubmit={createPost}
          />
          :
          null
      }
      
    </>
  )
}

export default CreatePrompt;