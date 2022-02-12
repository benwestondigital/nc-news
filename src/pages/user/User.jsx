import Loading from '../../common/components/Loading';
import ErrorPage from '../../common/components/ErrorPage';
import { UserContext } from '../../common/contexts/User';
import { useContext, useEffect, useState } from 'react';
import { getArticles } from '../../common/utils/api';

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
        setUniqueUsers([...new Set(users)]);
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
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
        const apiUser = data.filter(author => {
          return author.author === user;
        });
        setUserData(apiUser);
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
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
    <Loading />
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
