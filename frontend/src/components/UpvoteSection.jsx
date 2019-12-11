import React from 'react';

const UpvoteSection = ({ postId, upvotes, setPostInfo }) => {
  const upvotePost = async () => {
    const result = await fetch(`/api/posts/${postId}/upvote`, { method: 'post' });
    const body = await result.json();
    setPostInfo(body);
  };

  return (
    <div>
      <button onClick={() => upvotePost()}>Add upvote</button>
      <p>Upvotes: {upvotes}</p>
    </div>
  );
};

export default UpvoteSection;
