import '../css/ArticlePreview.css';
import Votes from '../components/Votes';
import { stringFormat, dateTimeFormat } from '../utils/utils';
import { Link } from 'react-router-dom';


const ArticlePreview = ({ data }) => {
  const { body, comment_count, created_at, title, topic, votes, article_id } =
    data;
  const { date, time } = dateTimeFormat(created_at);

  return (
    <div className="ArticlePreview">
      <h3 className="ArticlePreview__topic">{stringFormat(topic)}</h3>
        <Link className="ArticlePreview--link" to={`/articles/${article_id}`}>
      <h2 className="ArticlePreview__title">{title}</h2>
      <p className="ArticlePreview__body">{body.slice(0, 100)}...</p>
      <p className="ArticlePreview__commentcount">{comment_count} Comments</p>
      <p className="ArticlePreview__datetime">
        {date} {time}
      </p>
      </Link>
      <Votes className="ArticlePreview__votes" article_id={article_id} votes={votes} />
    </div>
  );
};

export default ArticlePreview;
