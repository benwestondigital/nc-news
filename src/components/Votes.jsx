import '../css/Votes.css';

const Votes = (props) => {
  //grab vote number as props to render on line 8
  return (
    <div className="Votes">
      <i className="fas fa-arrow-circle-up"></i>
      <p>Votes</p>
      <i className="fas fa-arrow-circle-down"></i>
    </div>
  );
};

export default Votes;