import React, { useState } from 'react';

const CommentSection = ({ postId, setPostInfo }) => {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const addComment = async () => {
    const result = await fetch(`/api/posts/${postId}/add-comment`, {
      method: 'post',
      body: JSON.stringify({ username, text: text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await result.json();
    setPostInfo(body);
    setUsername('');
    setText('');
  };

  return (
    <div>
      <h3>Add a comment</h3>
      <label>
        Name:
        <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
        Comment:
        <textarea rows="4" cols="50" value={text} onChange={event => setText(event.target.value)} />
      </label>
      <br />
      <button onClick={() => addComment()}>Add comment</button>
    </div>
  );
};

export default CommentSection;
