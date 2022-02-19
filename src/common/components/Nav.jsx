import '../css/Nav.css';
import { ErrorPage, Loading } from './index';
import { useState, useEffect } from 'react';
import { getTopics, getArticleSort } from '../utils/api';
import { stringFormat } from '../utils/utils';
import axios from 'axios';

const Nav = ({ searchQueries, setSearchQueries }) => {
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState(['created_at']);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchMenus = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const apiTopics = await getTopics(source);
        const apiArticleKeys = await getArticleSort(source);
        setTopics(apiTopics);
        setSortBy(apiArticleKeys);
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenus();
    return () => source.cancel('User cancelled operation.');
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
          <select onChange={handleTopicChange} value={searchQueries.topic} className="select" id="topics">
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
          <select onChange={handleSortChange} value={searchQueries.sort_by} className="select" id="sortby">
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
