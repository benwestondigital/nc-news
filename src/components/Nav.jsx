import '../css/Nav.css';
import ErrorPage from './ErrorPage';
import LoadingSpinner from './Loading';
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
        setIsLoading(false);
      } catch (err) {
        setIsError(err);
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
    <LoadingSpinner />
  ) : (
    <div className="Nav">
      <form>
        <label htmlFor="topics">Topics:</label>
        <select
          onChange={handleTopicChange}
          className="Nav__select"
          id="topics"
        >
          <option value={''}>All</option>
          {topics.map(topic => {
            return (
              <option key={topic.slug} value={topic.slug} name={topic.slug}>
                {stringFormat(topic.slug)}
              </option>
            );
          })}
        </select>
      </form>
      <form>
        <label htmlFor="sortby">Sort:</label>
        <select onChange={handleSortChange} className="Nav__select" id="sortby">
          {sortBy.map(sort => {
            return (
              <option key={sort} value={sort} name={sort}>
                {stringFormat(sort)}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
};

export default Nav;
