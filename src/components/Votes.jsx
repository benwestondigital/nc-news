import '../css/Votes.css';
import { useState } from 'react';
import { patchArticleVote } from '../utils/api';

const Votes = ({ article_id, votes }) => {
  const [voteChange, setVoteChange] = useState(0);
  const [voteCounter, setVoteCounter] = useState(0);
  const [isError, setIsError] = useState(null);

  const handleVoteClick = ({ target: { id: vote } }, ...e) => {
    e.preventDefault();
    let sentVote = 0;
    vote === 'up' ? (sentVote = 1) : (sentVote = -1);

    try {
      if (vote === 'up' && voteCounter < 1) {
        setVoteCounter(currCount => currCount + 1);
        setVoteChange(currVotes => currVotes + sentVote);
      } else if (vote === 'down' && voteCounter > -1) {
        setVoteCounter(currCount => currCount - 1);
        setVoteChange(currVotes => currVotes + sentVote);
      }
      patchArticleVote(article_id, sentVote);
      setIsError(null);
    } catch (err) {
      setVoteChange(currVotes => currVotes - sentVote);
      setIsError('Something went wrong, please try again.');
    }
  };

  isError && <p>{isError}</p>;
  return (
    <div className="Votes">
      <i
        type="button"
        onClick={handleVoteClick}
        id={'up'}
        className="fas fa-arrow-circle-up"
      ></i>
      <p>{votes + voteChange}</p>
      <i
        onClick={handleVoteClick}
        id={'down'}
        className="fas fa-arrow-circle-down"
      ></i>
    </div>
  );
};

export default Votes;
