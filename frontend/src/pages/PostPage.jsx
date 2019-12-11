import React, { useState, useEffect } from 'react';
import posts from './posts';
import NotFoundPage from './NotFoundPage';

const PostPage = ({ match }) => {
  const postId = match.params.postId;
  const [postInfo, setPostInfo] = useState({ upvotes: 0, comments: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/posts/${postId}`);
      const body = await result.json();
      console.log(body);
      setPostInfo(body);
    };
    fetchData();
    setPostInfo({ upvotes: 3 });
  }, [postId]);
  const post = posts.find(post => post.postId === postId);
  if (!post) return <NotFoundPage />;
  return (
    <div className="post-content">
      <h2>{post.postTitle}</h2>
      <p>Upvotes: {postInfo.upvotes}</p>
      {post.postContent.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
    </div>
  );
};

export default PostPage;
