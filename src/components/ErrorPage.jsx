import { Link } from 'react-router-dom';

const ErrorPage = props => {
  return (
    <div>
      {props.children}
      <p>{props.error.message}</p>
      <button>
        <Link to="/">Return to Home</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
