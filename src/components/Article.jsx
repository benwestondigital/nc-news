import '../css/Article.css';
import Votes from '../components/Votes';
import { stringFormat, dateTimeFormat } from '../utils/utils';
const Article = ({ data }) => {
  const { author, body, comment_count, created_at, title, topic, votes } = data;
  const {date, time} = dateTimeFormat(created_at);
  console.log(date, time);

  return (
    <div className="Article">
      <Votes votes={votes}/>
      <p>{author}</p>
      <p>{stringFormat(topic)}</p>
      <p>{title}</p>
      <p>{body.slice(0,100)}...</p>
      <p>{comment_count} Comments</p>
      <p>{date} {time}</p>
    </div>
  );
};

export default Article;
