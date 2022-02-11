const Spinner = require('react-spinkit');

const LoadingSpinner = () => {
  return (
    <>
      <p>Loading...</p>
      <Spinner name="circle" />
    </>
  );
};

export default LoadingSpinner;
