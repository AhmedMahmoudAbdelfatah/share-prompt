import PostCard from "./PostCard"
import { PostWithIdType } from "./PostList"

type ProfilePropsType = {
  name: string,
  desc: string,
  handleEdit?: (id: string) => void,
  handleDelete?: (id: string) => void,
  data: PostWithIdType[]
}

const Profile = (props: ProfilePropsType) => {
  return (
    <section className="w-full]">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {props.name} Profile
        </span>
      </h1>
      <p className="desc text-left">{props.desc}</p>
      
      <div className="mt-16 prompt_layout">
        {props.data.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleEdit={props.handleEdit}
            handleDelete={props.handleDelete}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile