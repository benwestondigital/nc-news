import '../css/CommentsContainer.css';
import Comment from './Comment';

const CommentContainer = () => {
  return (
    <div className="CommentContainer">
      <form>
        <label htmlFor="addComment">Comment:</label>
        <input id="addComment"></input>
      </form>
      <Comment />
    </div>
  );
};

export default CommentContainer;
