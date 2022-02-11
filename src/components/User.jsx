import LoadingSpinner from './Loading';
import ErrorPage from './ErrorPage';
import { UserContext } from '../contexts/User';
import { useContext, useEffect, useState } from 'react';
import { getArticles } from '../utils/api';

const User = () => {
  const { user, setUser } = useContext(UserContext);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const changeLoggedInUser = ({ target: { value } }) => {
    setUser(value);
  };

  useEffect(() => {
    const fetchUniqueUsers = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const users = (await getArticles()).map(user => user.author);
        setIsLoading(false);
        setUniqueUsers([...new Set(users)]);
      } catch (err) {
        setIsError(err);
      }
    };
    fetchUniqueUsers();
  }, []);

  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getArticles();
        setIsLoading(false);
        const apiUser = data.filter(author => {
          return author.author === user;
        });
        setUserData(apiUser);
      } catch (err) {
        setIsError(err);
      }
    };
    fetchLoggedInUserData();
  }, [user]);

  useEffect(() => {
    const workOutUserStats = () => {
      const articlesPosted = userData.length;
      const commentCount = userData.reduce((acc, obj) => {
        return acc + Number(obj.comment_count);
      }, 0);
      const voteCount = userData.reduce((acc, obj) => {
        return acc + obj.votes;
      }, 0);
      setUserStats({
        ...userStats,
        articlesPosted,
        commentCount,
        voteCount,
      });
    };
    workOutUserStats();
  }, [userData]);

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <h1>Hello {user}</h1>
      <form>
        <label htmlFor="selectUser">Switch User:</label>
        <select value={user} onChange={changeLoggedInUser} id="selectUser">
          {uniqueUsers.map(uniqueUser => {
            return (
              <option key={uniqueUser} value={uniqueUser}>
                {uniqueUser}
              </option>
            );
          })}
        </select>
      </form>
      <h3>Articles</h3>
      <p>Posted: {userStats.articlesPosted}</p>
      <p>Comments Received: {userStats.commentCount}</p>
      <p>Karma: {userStats.voteCount}</p>
    </div>
  );
};

export default User;
