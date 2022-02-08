import '../css/Nav.css';
import { getTopics, getArticleSort } from '../utils/api';
import { useState, useEffect } from 'react';

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState([]);

  useEffect(() => {
    async function fetchMenus() {
      const apiTopics = await getTopics();
      const apiArticleKeys = await getArticleSort();
      setTopics(apiTopics);
      setSortBy(apiArticleKeys);
    }
    fetchMenus();
  }, []);

  return (
    <div className="Nav">
      <form>
        <label htmlFor="topics">Topics:</label>
        <select id="topics">
          {topics.map(topic => {
            return <option key={topic.slug}>{topic.slug}</option>;
          })}
        </select>
      </form>
      <form>
        <label htmlFor="sortby">Sort:</label>
        <select id="sortby">
          {sortBy.map(sortItem => {
            return <option key={sortItem}>{sortItem}</option>;
          })}
        </select>
      </form>
    </div>
  );
};

export default Nav;
