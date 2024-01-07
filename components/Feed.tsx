"use client"
import { useState, FormEvent } from 'react';
import PostList from './PostList';
import Loading from './Loading';
import { useFilteredPosts } from '@hooks/useFilteredPosts';
import { useAllPosts } from '@hooks/useAllPosts';

export const dynamic = 'force-dynamic';
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const { posts, loading } = useAllPosts();
  const { filteredPosts } = useFilteredPosts(searchText, posts);

  const handleSearchChange = (e: FormEvent) => {
    setSearchText((e.target as HTMLInputElement).value);
  }

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag, prompt or user name'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
          spellCheck="false"
        />
      </form>
      {
        loading ?
          <Loading />
          :
          <PostList
            data={filteredPosts}
            handleTagClick={handleTagClick}
          /> 
      }
    </section>
  )
}

export default Feed