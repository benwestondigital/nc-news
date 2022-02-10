import { useContext } from 'react';
import { UserContext } from '../contexts/User';

const User = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <h1>hello {user}</h1>
    </div>
    //articles posted by user
    //number of articles posted
    //number of comments posted
    //karma
  );
};

export default User;
