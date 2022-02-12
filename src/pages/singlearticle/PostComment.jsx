import { UserContext } from '../../common/contexts/User';
import { useState, useContext } from 'react';
import { postComment } from '../../common/utils/api';

const PostComment = ({ article_id, setComments }) => {
  const [input, setInput] = useState('');
  const { user } = useContext(UserContext);

  const handleInput = ({target:{value}}) => {
    setInput(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newComment = await postComment(article_id, user, input);
    setComments(currComments => {
      return [newComment, ...currComments];
    });
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
      <button type="button">Add Comment</button>
    </form>
  );
};

export default PostComment;
