import React from 'react';
import posts from './posts';
import NotFoundPage from './NotFoundPage';

const PostPage = ({ match }) => {
  const postId = match.params.postId;
  const post = posts.find(post => post.postId === postId);
  if (!post) return <NotFoundPage />;
  return (
    <div className="post-content">
      <h2>{post.postTitle}</h2>
      {post.postContent.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
    </div>
  );
};

export default PostPage;
