import '../css/Comment.css';
import Votes from './Votes';
import { dateTimeFormat } from '../utils/utils';

const Comment = ({data}) => {
    const {created_at, author, votes, body} = data;
    const { date, time } = dateTimeFormat(created_at);

    return (
        <div className='Comment'>
            <p>{author}</p>
            <p>{body}</p>
            <p>{date} {time}</p>
            <Votes votes={votes}/>
            {/* if user === comment user then show delete button */}
        </div>
    );
};

export default Comment;