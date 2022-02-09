import '../css/CommentsContainer.css';
import Comment from './Comment';
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
  }, [article_id]);

  return (
    <div className="CommentContainer">
      <form>
        <label htmlFor="addComment">Comment:</label>
        <input placeholder="Leave a comment" id="addComment"></input>
        <button>Add Comment</button>
      </form>
      {comments.map(comment => {
        return <Comment key={comment.comment_id} data={comment} />
      })}
      
    </div>
  );
};

export default CommentsContainer;
