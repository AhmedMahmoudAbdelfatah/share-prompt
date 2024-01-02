"use client"
import Image from 'next/image'
import { PostWithIdType } from './PostList'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

type PostCardPropsType = {
  post: PostWithIdType,
  handleTagClick?: (tag: string) => void
  handleEdit?: (id: string) => void,
  handleDelete?: (id: string) => void,
}

const PostCard = (props: PostCardPropsType) => {
  const [copied, setCopied] = useState("");
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  
  const handleCopy = () => {
    setCopied(props.post.prompt);
    navigator.clipboard.writeText(props.post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  const handleProfileClick = () => {
    if (props.post.creator._id === session?.user.id) router.push("/profile");
    else router.push(`/profile/${props.post.creator._id}?name=${props.post.creator.name}`);
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className={`flex flex-1 justify-start items-center gap-3 ${pathname.includes("profile")? "" : "cursor-pointer"}`}
          onClick={handleProfileClick}
        >
          <Image
            src={props?.post?.creator?.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {props?.post?.creator?.name}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {props?.post?.creator?.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === props.post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
            alt='copy'
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{props.post.prompt}</p>
      <p
        className={`font-inter text-sm blue_gradient ${pathname.includes("profile")? "" : "cursor-pointer"}`}
        onClick={() => props.handleTagClick && props.handleTagClick(props.post.tag)}
      >
        #{props.post.tag}
      </p>
      {pathname === "/profile" && (
        <div
          className='mt-5 flex-center gap-4'
        >
          <p
            className='font-inter text-sm green_gradient cursor-pointer select-none'
            onClick={() => props.handleEdit && props.handleEdit(props.post._id)}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer select-none'
            onClick={() => props.handleDelete && props.handleDelete(props.post._id)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PostCard