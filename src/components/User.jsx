import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/User';
import { getArticles } from '../utils/api';
const Spinner = require('react-spinkit');

const User = () => {
  const { user, setUser } = useContext(UserContext);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const changeLoggedInUser = e => {
    setUser(e.target.value);
  };

  useEffect(() => {
    const fetchUniqueUsers = async () => {
      const users = (await getArticles()).map(user => user.author);
      setUniqueUsers([...new Set(users)]);
    };
    fetchUniqueUsers();
  }, []);

  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      setIsLoading(true);
      const data = await getArticles();
      const apiUser = data.filter(author => {
        return author.author === user;
      });
      setUserData(apiUser);
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
      setIsLoading(false);
    };
    workOutUserStats();
  }, [userData]);

  return isLoading ? (
    <>
      <p>Loading...</p>
      <Spinner name="circle" />
    </>
  ) : (
    <div>
      <h1>hello {user}</h1>
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
