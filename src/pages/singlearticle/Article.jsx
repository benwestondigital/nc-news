import './css/Article.css';
import { Votes } from '../../common/components/index';
import { stringFormat, dateTimeFormat } from '../../common/utils/utils';

const Article = ({
  data: {
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
    votes,
    article_id,
  },
}) => {
  const { date, time } = dateTimeFormat(created_at);

  return (
    <div className="Article">
      <p className="Article__author">{author}</p>
      <h3 className="Article__topic">{stringFormat(topic)}</h3>
      <h2 className="Article__title">{title}</h2>
      <p className="Article__body">{body}</p>
      <p className="Article__commentcount">{comment_count} Comments</p>
      <p className="Article__datetime">
        {date} {time}
      </p>
      <Votes className="Article__votes" article_id={article_id} votes={votes} />
    </div>
  );
};

export default Article;
