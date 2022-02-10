import { UserContext } from '../contexts/User';
import { useContext } from 'react';
import '../css/Comment.css';
import { dateTimeFormat } from '../utils/utils';
import { deleteComment } from '../utils/api';

const Comment = ({ data, setComments }) => {
  const { user } = useContext(UserContext);
  const { comment_id, created_at, author, body } = data;
  const { date, time } = dateTimeFormat(created_at);
  const renderDelete = () => author === user;

  const handleDelete = () => {
    deleteComment(comment_id);
    //use setComments.filter to remove the relevant comment'
    setComments(currComments => {
      return currComments.filter(currComments.comment_id !== comment_id);
    });
  };

  return (
    <div className="Comment">
      <p className="Comment__author">{author}</p>
      <p className="Comment__body">{body}</p>
      <p className="Comment__datetime">
        {date} {time}
      </p>
      {renderDelete() && (
        <button onClick={handleDelete} className="Comment__delete">
          Delete
        </button>
      )}
    </div>
  );
};

export default Comment;
