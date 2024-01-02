'use client'

import Form, { PostType } from "@components/Form"
import { FormEvent, useEffect, useState } from "react"
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'


const UpdatePost = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<PostType>({
    prompt: "",
    tag: ""
  });
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  useEffect(() => {
    if (!session?.user) router.push('/');

    const getPost = async () => {
      try {
        const res = await fetch(`api/post/${postId}`);
        const data = await res.json() as PostType;
        setPost({
          prompt: data.prompt,
          tag: data.tag
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (postId) getPost();
    
  }, [postId]);

  const updatePost = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert("Post Id is not found");

    try {
      const res = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...post,
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
      {
        status === 'authenticated' ?
          <Form
            type="Edit"
            post={post}
            loading={loading}
            onPromptChange={onPromptChange}
            onTagChange={onTagChange}
            submitting={submitting}
            handleSubmit={updatePost}
          />
          :
          null
      }
      
    </>
  )
}

export default UpdatePost;