import '../css/Nav.css';
import { ErrorPage, Loading } from './index';
import { useState, useEffect } from 'react';
import { getTopics, getArticleSort } from '../utils/api';
import { stringFormat } from '../utils/utils';

const Nav = ({ searchQueries, setSearchQueries }) => {
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState(['created_at']);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const apiTopics = await getTopics();
        const apiArticleKeys = await getArticleSort();
        setTopics(apiTopics);
        setSortBy(apiArticleKeys);
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenus();
  }, []);

  const handleTopicChange = ({ target: { value } }) => {
    setSearchQueries({
      ...searchQueries,
      topic: value,
    });
  };

  const handleSortChange = ({ target: { value } }) => {
    setSearchQueries({
      ...searchQueries,
      sort_by: value,
    });
  };

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="Nav">
      <form>
        <div className="form__dropdown">
          <label htmlFor="topics">Topics:</label>
          <select onChange={handleTopicChange} className="select" id="topics">
            <option value={''}>All</option>
            {topics.map(topic => {
              return (
                <option key={topic.slug} value={topic.slug} name={topic.slug}>
                  {stringFormat(topic.slug)}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <form>
        <div className="form__dropdown">
          <label htmlFor="sortby">Sort:</label>
          <select onChange={handleSortChange} className="select" id="sortby">
            {sortBy.map(sort => {
              return (
                <option key={sort} value={sort} name={sort}>
                  {stringFormat(sort)}
                </option>
              );
            })}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Nav;
