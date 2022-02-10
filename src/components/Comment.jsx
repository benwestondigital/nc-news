import { UserContext } from '../contexts/User';
import { useContext } from 'react';
import '../css/Comment.css';
import { dateTimeFormat } from '../utils/utils';

const Comment = ({ data }) => {
  const { user } = useContext(UserContext);
  const { created_at, author, body } = data;
  const { date, time } = dateTimeFormat(created_at);

  const renderDelete = () => author === user;

  console.log(renderDelete());

  return (
    <div className="Comment">
      <p className="Comment__author">{author}</p>
      <p className="Comment__body">{body}</p>
      <p className="Comment__datetime">
        {date} {time}
      </p>
      {renderDelete() && <p className="Comment__delete">Delete</p>}
    </div>
  );
};

export default Comment;
