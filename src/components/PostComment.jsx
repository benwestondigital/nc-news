import { useState, useContext } from 'react';
import { postComment } from '../utils/api';
import { UserContext } from '../contexts/User';

const PostComment = ({ article_id, setComments }) => {
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
