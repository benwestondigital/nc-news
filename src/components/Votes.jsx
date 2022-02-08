import '../css/Votes.css';

const Votes = ({votes}) => {
  return (
    <div className="Votes">
      <i className="fas fa-arrow-circle-up"></i>
      <p>{votes}</p>
      <i className="fas fa-arrow-circle-down"></i>
    </div>
  );
};

export default Votes;