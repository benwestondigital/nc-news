import '../css/Nav.css';
import { getTopics, getArticle } from '../utils/api';
import { useState, useEffect } from 'react';

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState([]);

  useEffect(() => {
    // refactor to async/await
    return getTopics().then(res => {
      setTopics(res);
    });
  }, []);

  useEffect(() => {
    return getArticle().then(res => {
      setSortBy(Object.keys(res));
    });
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
