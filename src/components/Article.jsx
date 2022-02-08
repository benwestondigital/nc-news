import '../css/Article.css';
import Votes from '../components/Votes';
import { stringFormat, dateTimeFormat } from '../utils/utils';
const Article = ({ data }) => {
  const { author, body, comment_count, created_at, title, topic, votes } = data;
  const {date, time} = dateTimeFormat(created_at);

  return (
    <div className="Article">
      <p className='Article__author'>{author}</p>
      <p className='Article__topic'>{stringFormat(topic)}</p>
      <p className='Article__title'>{title}</p>
      <p className='Article__body'>{body.slice(0,100)}...</p>
      <p className='Article__commentcount'>{comment_count} Comments</p>
      <p className='Article__datetime'>{date} {time}</p>
      <Votes className='Article__votes' votes={votes}/>
    </div>
  );
};

export default Article;
