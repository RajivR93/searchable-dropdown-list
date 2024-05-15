import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

interface PostInputProps {
  onCreate: (content: string) => void; // Function to handle post creation
}

const PostInput: React.FC<PostInputProps> = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentions, setMentions] = useState<string[]>([]);
  const [filteredMentions, setFilteredMentions] = useState<string[]>([]); // New state for filtered mentions

  const allMentions = ["Samuel Jackson", "Binoy David", "Jackson", "Selar"]; // Your list of mentions

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    // Check for '@' and show mentions dropdown
    if (event.target.value.endsWith("@")) {
      setShowMentions(true);
      setFilteredMentions(allMentions); // Show all mentions initially on '@'
    } else {
      setShowMentions(false);
      setFilteredMentions([]); // Clear filtered mentions on other characters
    }
  };

  const handleMentionSelect = (mention: string) => {
    setContent(`${content} ${mention}`);
    setMentions(prevMentions => [...prevMentions, mention]); // Use the updater function
    setShowMentions(false);
    setFilteredMentions([]); // Clear filtered mentions after selection
  
    console.log({ content });
    console.log({ mentions });
  };
  

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      const lastChar = content.slice(-1);
      if (lastChar === " ") {
        setMentions(mentions.slice(0, mentions.length - 1));
      }
    }
  };

  const handleSearch = (searchValue: string) => {
    // Filter mentions based on search term
    setFilteredMentions(allMentions.filter((mention) => mention.toLowerCase().includes(searchValue.toLowerCase())));
  };

  const handleCreatePost = () => {
    onCreate(content);
    setContent("");
    setMentions([]);
  };

  return (
    <div className="">
      <textarea
        className="border rounded p-2 w-100 h-24 focus:outline-none focus:border-blue-500"
        value={content}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      {showMentions && (
        <div className="absolute mt-1 w-25 bg-white rounded shadow-md serch-box" >
          <input
            className="p-1 border-b focus:outline-none focus:border-blue-500"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          
          <ul className='list-style'>
            {filteredMentions.map((mention) => (
              <li key={mention} onClick={() => handleMentionSelect(mention)}>
                {mention}
              </li>
            ))}
          </ul>
          
        </div>
      )}
      <div className='button-container'>
      <button
        className="button"
        onClick={handleCreatePost}
      >
        Post
      </button>
      </div>
    </div>
  );
};

export default PostInput;
