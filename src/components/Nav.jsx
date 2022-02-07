import '../css/Nav.css';
import { getTopics } from '../utils/api';
import { useState, useEffect } from 'react';

const Nav = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    return getTopics().then(res => {
      setTopics(res);
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
        <label htmlFor="sortby">Sort Articles By:</label>
        <select id="sortby"></select>
      </form>
    </div>
  );
};

export default Nav;
