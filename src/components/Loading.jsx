const Spinner = require('react-spinkit');

const LoadingSpinner = () => {
  return (
    <div className='Loading'>
      <p className='Loading__text'>Loading...</p>
      <Spinner name="circle" />
    </div>
  );
};

export default LoadingSpinner;
