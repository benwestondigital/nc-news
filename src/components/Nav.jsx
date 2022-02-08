import '../css/Nav.css';
import { getTopics, getArticleSort } from '../utils/api';
import { useState, useEffect } from 'react';
import { menuFormat } from '../utils/utils';

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState([]);

  useEffect(() => {
    const fetchMenus= async () => {
      try {
        const apiTopics = await getTopics();
        const apiArticleKeys = await getArticleSort();
        setTopics(apiTopics);
        setSortBy(apiArticleKeys);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMenus();
  }, []);

  return (
    <div className="Nav">
      <form>
        <label htmlFor="topics">Topics:</label>
        <select className="Nav__select" id="topics">
          {topics.map(topic => {
            return <option key={topic.slug}>{menuFormat(topic.slug)}</option>;
          })}
        </select>
      </form>
      <form>
        <label htmlFor="sortby">Sort:</label>
        <select className="Nav__select" id="sortby">
          {sortBy.map(sortItem => {
            return <option key={sortItem}>{menuFormat(sortItem)}</option>;
          })}
        </select>
      </form>
    </div>
  );
};

export default Nav;
