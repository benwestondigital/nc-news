const Spinner = require('react-spinkit');

const Loading = () => {
  return (
    <div className='Loading'>
      <p className='Loading__text'>Loading...</p>
      <Spinner name="circle" />
    </div>
  );
};

export default Loading;
