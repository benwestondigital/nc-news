import './css/CommentsContainer.css';
import Comment from './Comment';
import PostComment from './PostComment';
import ErrorPage from '../../components/ErrorPage';
import LoadingSpinner from '../../components/Loading';
import { useState, useEffect } from 'react';
import { getCommentsByArticleId } from '../../utils/api';

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
        setIsLoading(false);
      } catch (err) {
        setIsError(err);
      }
    };
    fetchComments();
  }, [article_id]);

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div id="comments" className="CommentContainer">
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
