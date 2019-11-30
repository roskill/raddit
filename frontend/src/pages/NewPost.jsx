import React, { useReducer } from 'react';

const initialState = {
  postTitle: '',
  postContent: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'postTitle':
      return { postTitle: action.payload };
    case 'postContent':
      return { postContent: action.payload };
    default:
      return state;
  }
};

const NewPost = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="form">
      <h2>New Post</h2>
      <form>
        <input
          name="postTitle"
          placeholder="Title"
          value={state.postTitle}
          onChange={event => dispatch({ type: 'postTitle', payload: event.target.value })}
        />
        <br />
        <textArea
          type="text"
          name="postContent"
          placeholder="Text (optional)"
          value={state.postContent}
          onChange={event => dispatch({ type: 'postContent', payload: event.target.value })}
        />
      </form>
      <button>Submit</button>
    </div>
  );
};

export default NewPost;
