const Spinner = require('react-spinkit');

const LoadingSpinner = () => {
  return (
    <div className='Loading'>
      <p>Loading...</p>
      <Spinner name="circle" />
    </div>
  );
};

export default LoadingSpinner;
