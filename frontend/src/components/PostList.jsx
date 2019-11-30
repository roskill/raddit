import React from 'react';
import { Link } from 'react-router-dom';
import posts from '../pages/posts';

const PostList = () => {
  return (
    <>
      {posts.map((post, key) => (
        <div className="post-list-item">
          <Link key={key} to={`/posts/${post.postId}`}>
            <h5>{post.postTitle.substring(0, 24)}...</h5>
          </Link>
        </div>
      ))}
    </>
  );
};

export default PostList;
