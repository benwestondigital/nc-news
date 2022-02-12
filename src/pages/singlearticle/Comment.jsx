import './css/Comment.css';
import { UserContext } from '../../common/contexts/User';
import { useContext } from 'react';
import { dateTimeFormat } from '../../common/utils/utils';
import { deleteComment } from '../../common/utils/api';

const Comment = ({
  data: { comment_id, created_at, author, body },
  setComments,
}) => {
  const { user } = useContext(UserContext);
  const { date, time } = dateTimeFormat(created_at);
  const renderDelete = () => author === user;

  const handleDelete = async () => {
    setComments(currComments => {
      return [...currComments.filter(obj => obj.comment_id !== comment_id)];
    });
    await deleteComment(comment_id);
  };

  return (
    <div className="Comment">
      <p className="Comment__author">{author}</p>
      <p className="Comment__body">{body}</p>
      <p className="Comment__datetime">
        {date} {time}
      </p>
      {renderDelete() && (
        <button
          type="button"
          onClick={handleDelete}
          className="Comment__delete"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Comment;
