import '../css/ArticlePreview.css';
import Votes from '../components/Votes';
import { stringFormat, dateTimeFormat } from '../utils/utils';
import { Link } from 'react-router-dom';


const ArticlePreview = ({ data }) => {
  const { body, comment_count, created_at, title, topic, votes, article_id } =
    data;
  const { date, time } = dateTimeFormat(created_at);

  return (
    <Link to={`/articles/${article_id}`} className="ArticlePreview">
      <h3 className="ArticlePreview__topic">{stringFormat(topic)}</h3>
      <h2 className="ArticlePreview__title">{title}</h2>
      <p className="ArticlePreview__commentcount">{comment_count} Comments</p>
      <p className="ArticlePreview__datetime">
        {date} {time}
      </p>
      <Votes article_id={article_id} votes={votes} />
    </Link>
  );
};

export default ArticlePreview;
