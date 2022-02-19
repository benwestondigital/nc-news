import './css/PostComment.css';
import { UserContext } from '../../common/contexts/User';
import { useState, useContext } from 'react';
import { postComment } from '../../common/utils/api';

const PostComment = ({ article_id, setComments }) => {
  const [input, setInput] = useState('');
  const [warning, setWarning] = useState(false);
  const { user } = useContext(UserContext);

  const handleInput = ({ target: { value } }) => {
    setWarning(false);
    setInput(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!input) {
      return setWarning(true);
    }
    const newComment = await postComment(article_id, user, input);
    setComments(currComments => {
      return [newComment, ...currComments];
    });
    setInput('');
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__commentbox">
          <label htmlFor="addComment">Comment:</label>
          <textarea
          className='form__textarea'
            onChange={handleInput}
            value={input}
            placeholder="Leave a comment"
            id="addComment"
          ></textarea>
        </div>
        <button
          className={`form__button ${
            warning ? 'form__button--inactive' : 'form__button--active'
          }`}
          type="submit"
        >
          Add Comment
        </button>
      </form>
      <div className="form__warning">{warning && <p>Please enter a comment before posting.</p>}</div>
    </>
  );
};

export default PostComment;
