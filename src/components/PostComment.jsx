import { useState, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { postComment } from '../utils/api';

const PostComment = ({ article_id }) => {
  const [input, setInput] = useState('');
  const { user } = useContext(UserContext);

  const handleInput = e => {
    setInput(e.target.value);

  };

  const handleSubmit = e => {
    e.preventDefault();
    postComment(article_id, user, input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="addComment">Comment:</label>
      <input
        onChange={handleInput}
        value={input}
        placeholder="Leave a comment"
        id="addComment"
      ></input>
      <button>Add Comment</button>
    </form>
  );
};

export default PostComment;
