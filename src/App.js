import React, { useState } from 'react';
import PostInput from './components/PostInput.tsx';
import PostCard from './components/PostCard.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
const App = () => {
  const [posts, setPosts] = useState([]);

  const handleCreatePost = (content) => {
    // Create a new post object with the content and mentions
    const mentions = content.match(/@(\w+)/g) || [];
    const newPost = { content: content, mentions: mentions };
    // Add the new post to the posts array
    setPosts([...posts, newPost]);
  };

  return (
    <div className="App">
      <div className='w-50 h-25 rounded p-2 h-24'>
      <PostInput onCreate={handleCreatePost} />
      </div>
      <div className="bg-white w-50 h-25 rounded p-2 h-24 mt-5">
        {posts.map((post, index) => (
          <PostCard key={index} content={post.content} mentions={post.mentions} />
        ))}
      </div>
    </div>
  );
};

export default App;
