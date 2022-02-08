import { useState, useEffect } from 'react';
import '../css/ArticlesContainer.css';
import Nav from '../components/Nav';
import Article from '../components/Article';
import { getArticles } from '../utils/api';

const ArticlesContainer = () => {
  const [articles, setArticles] = useState([]);
  const [activeTopic, setActiveTopic] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiArticles = await getArticles(activeTopic);
        setArticles(apiArticles);
      } catch (err) {
        console.log(err);
      }
    };
    fetchArticles();
  }, [activeTopic]);

  return (
    <div className="ArticlesContainer">
      <Nav
        setActiveTopic={setActiveTopic}
      />
      {articles.map(article => {
        return <Article key={article.article_id} data={article} />;
      })}
    </div>
  );
};

export default ArticlesContainer;
