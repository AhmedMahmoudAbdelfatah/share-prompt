import { useState, useEffect} from 'react';
import  { PostWithIdType } from '@components/PostList';

export const useFilteredPosts = (searchText: string, posts: PostWithIdType[]) => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();
  const [filteredPosts, setFilteredPosts] = useState<PostWithIdType[]>([]);

  const PostsFilter = () => {
    if (!searchText) return posts;
    const regex = new RegExp(searchText, "i"); 
    return posts.filter((post) =>
      regex.test(post.creator.name) ||
      regex.test(post.tag) ||
      regex.test(post.prompt)
    );
  }

  // seperate the debounce of the input from the change in posts which doesn`t need debounce.
  useEffect(() => {
    setFilteredPosts(PostsFilter());
  }, [posts]);

  //debounce effect
  useEffect(() => {
    if (posts.length > 0) { // to make sure it won`t be triggered unless the posts are loaded.
      clearTimeout(timerId);
  
      const id = setTimeout(() => {
        setFilteredPosts(PostsFilter());
      }, 500);
  
      setTimerId(id);
    }

    return () => clearTimeout(timerId);

  }, [searchText]);
  
  return { filteredPosts };
}