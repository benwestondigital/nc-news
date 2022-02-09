import '../css/Comment.css';
import { dateTimeFormat } from '../utils/utils';

const Comment = ({data}) => {
    const {created_at, author, body} = data;
    const { date, time } = dateTimeFormat(created_at);

    return (
        <div className='Comment'>
            <p className="Comment__author">{author}</p>
            <p className='Comment__body'>{body}</p>
            <p className='Comment__datetime'>{date} {time}</p>
            {/* if user === author then show delete button */}
            <p className='Comment__delete'>Delete</p>
        </div>
    );
};

export default Comment;