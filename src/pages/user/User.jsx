import './user.css';
import { Loading, ErrorPage } from '../../common/components/index';
import { UserContext } from '../../common/contexts/User';
import { useContext, useEffect, useState } from 'react';
import { getUsers } from '../../common/utils/api';
import { userDataMath } from '../../common/utils/utils';
import image from '../../common/user-img.png';
import axios from 'axios';

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
    const source = axios.CancelToken.source();
    const fetchUniqueUsers = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const users = (await getUsers(source)).map(user => user.author);
        setUniqueUsers([...new Set(users)]);
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUniqueUsers();
    return () => source.cancel('User cancelled operation.');
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchLoggedInUserData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getUsers(source);
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
    return () => source.cancel('User cancelled operation.');
  }, [user]);

  useEffect(() => {
    const workOutUserStats = () => {
      const { articlesPosted, commentCount, voteCount } =
        userDataMath(userData);
      setUserStats({
        ...userStats,
        articlesPosted,
        commentCount,
        voteCount,
      });
    };
    workOutUserStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className='User'>
      <main className='information'>
        <h1>Hello {user}</h1>
        <img className='User__img' src={image} alt='profile' />
        <form>
          <div className='form__dropdown'>
            <label htmlFor='selectUser'>Switch User:</label>
            <select
              className='select'
              value={user}
              onChange={changeLoggedInUser}
              id='selectUser'
            >
              {uniqueUsers.map(uniqueUser => {
                return (
                  <option key={uniqueUser} value={uniqueUser}>
                    {uniqueUser}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
        <div className='articlestats'>
          <h3>Article Stats</h3>
          <p>
            Posted: <strong>{userStats.articlesPosted}</strong>
          </p>
          <p>
            Comments Received: <strong>{userStats.commentCount}</strong>
          </p>
          <p>
            Karma: <strong>{userStats.voteCount}</strong>
          </p>
        </div>
      </main>
    </div>
  );
};

export default User;
