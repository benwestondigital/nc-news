import { useState, useEffect } from 'react';
import '../css/Nav.css';
import { getTopics, getArticleSort } from '../utils/api';
import { stringFormat } from '../utils/utils';

const Nav = ({ searchQueries,setSearchQueries }) => {
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const apiTopics = await getTopics();
        const apiArticleKeys = await getArticleSort();
        setTopics(apiTopics);
        setSortBy(apiArticleKeys);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMenus();
  }, []);

  const handleTopicChange = e => {
    setSearchQueries({
      ...searchQueries,
      topic: e.target.value,
    });
  };

  const handleSortChange = e => {
    setSearchQueries({
      ...searchQueries,
      sort_by: e.target.value,
    })
  }

  return (
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
        <select
          onChange={handleSortChange}
          className="Nav__select"
          id="sortby"
        >
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
