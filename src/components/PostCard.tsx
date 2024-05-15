import React from 'react';
import TimeAgo from './TimeAgo.tsx'

interface PostCardProps {
  content: string;
  mentions: string[];
}

const PostCard: React.FC<PostCardProps> = ({ content, mentions }) => {
  
  return (
    <div className="bg-white-100 rounded p-4 mb-4">
      <p className="text-lg fs-5 mb-5">{content.replace("@", "")}</p>
      {mentions.length > 0 && (
        <p className="text-blue-500">
          Mentioned: {mentions}
        </p>
      )}
      <hr/>
      <div className='d-flex flex-row'>
        <div className='me-2'>
        <p className='bg-info p-2 rounded-circle font-weight-bold fs-4'>F</p>
        </div>
        <div>
        <p className='m-0 mt-2 fw-bold fs-6'>Florance angle</p>
        <p className='text-secondary fs-6'> <TimeAgo timestamp={Date.now()} /> </p>

        </div>
      </div>
    </div>
  );
};

export default PostCard;
