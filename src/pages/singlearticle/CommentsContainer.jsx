import './css/CommentsContainer.css';
import Comment from './Comment';
import PostComment from './PostComment';
import { ErrorPage, Loading } from '../../common/components/index';
import { useState, useEffect } from 'react';
import { getCommentsByArticleId } from '../../common/utils/api';

const CommentsContainer = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const apiComments = await getCommentsByArticleId(article_id);
        setComments(apiComments);
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
    return () => setComments([]);
  }, [article_id]);

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div id="comments" className="CommentsContainer">
      <PostComment article_id={article_id} setComments={setComments} />
      {comments.map(comment => {
        return (
          <Comment
            key={comment.comment_id}
            data={comment}
            setComments={setComments}
            comments={comments}
          />
        );
      })}
    </div>
  );
};

export default CommentsContainer;
