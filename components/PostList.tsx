import { PostType } from "./Form"
import PostCard from "./PostCard"

export type PostWithIdType = PostType & {
  creator: {
    email: string,
    name: string,
    image: string,
    _id: string
  },
  _id: string
}

type PostListPropsType = {
  data: PostWithIdType[],
  handleTagClick: (tag: string) => void
}
const PostList = (props: PostListPropsType) => {
  return (
    <div className="mt-16 prompt_layout">
      {props.data.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleTagClick={props.handleTagClick}
        />
      ))}
    </div>
  )
}

export default PostList