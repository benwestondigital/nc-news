import '../css/CommentsContainer.css';
import Comment from './Comment';
import PostComment from './PostComment';
import { getCommentsByArticleId } from '../utils/api';
import { useState, useEffect } from 'react';

const CommentsContainer = ({ article_id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const apiComments = await getCommentsByArticleId(article_id);
        setComments(apiComments);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [article_id, comments]);

  return (
    <div id="comments" className="CommentContainer">
      <PostComment article_id={article_id} setComments={setComments}/>
      {comments.map(comment => {
        return <Comment key={comment.comment_id} data={comment} />;
      })}
    </div>
  );
};

export default CommentsContainer;
