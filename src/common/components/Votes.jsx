import '../css/Votes.css';
import { useState } from 'react';
import { patchArticleVote } from '../utils/api';
import { ErrorPage } from './index';

const Votes = ({ article_id, votes }) => {
  const [voteChange, setVoteChange] = useState(0);
  const [isError, setIsError] = useState(null);

  const handleVoteClick = async e => {
    e.preventDefault();
    const vote = e.target.id;
    let sentVote = 0;
    vote === 'up' ? (sentVote = 1) : (sentVote = -1);

    try {
      setIsError(false);
      if (vote === 'up' && voteChange < 1) {
        setVoteChange(currVotes => currVotes + sentVote);
        await patchArticleVote(article_id, sentVote);
      } else if (vote === 'down' && voteChange > -1) {
        setVoteChange(currVotes => currVotes + sentVote);
        await patchArticleVote(article_id, sentVote);
      }
    } catch (err) {
      setVoteChange(currVotes => currVotes - sentVote);
      setIsError(err);
    }
  };

  if (isError) {
    return <ErrorPage error={isError} />;
  }

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
