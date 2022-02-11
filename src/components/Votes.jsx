import '../css/Votes.css';
import { useState } from 'react';
import { patchArticleVote } from '../utils/api';

const Votes = ({ article_id, votes }) => {
  const [voteChange, setVoteChange] = useState(0);
  const [isError, setIsError] = useState(null);

  const handleVoteClick = e => {
    e.preventDefault();
    let sentVote = 0;
    e.target.className.includes('up') ? (sentVote = 1) : (sentVote = -1);

    try {
      setVoteChange(currVotes => currVotes + sentVote);
      setIsError(null);
      patchArticleVote(article_id, sentVote);
    } catch (err) {
      setVoteChange(currVotes => currVotes - sentVote);
      setIsError('Something went wrong, please try again.');
    }
  };

  isError && <p>{isError}</p>;
  return (
    <div className="Votes">
      <i onClick={handleVoteClick} className="fas fa-arrow-circle-up"></i>
      <p>{votes + voteChange}</p>
      <i onClick={handleVoteClick} className="fas fa-arrow-circle-down"></i>
    </div>
  );
};

export default Votes;
