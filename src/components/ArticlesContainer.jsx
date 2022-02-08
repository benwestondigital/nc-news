import { useState, useEffect } from 'react';
import '../css/ArticlesContainer.css';
import Nav from '../components/Nav';
import Article from '../components/Article';
import { getArticles } from '../utils/api';

const ArticlesContainer = () => {
  const [articles, setArticles] = useState([]);
  const [searchQueries, setSearchQueries] = useState({
    topic: '',
    sort_by: 'article_id',
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiArticles = await getArticles(searchQueries);
        setArticles(apiArticles);
      } catch (err) {
        console.log(err);
      }
    };
    fetchArticles();
  }, [searchQueries]);

  return (
    <div className="ArticlesContainer">
      <Nav
        searchQueries={searchQueries}
        setSearchQueries={setSearchQueries}
      />
      {articles.map(article => {
        return <Article key={article.article_id} data={article} />;
      })}
    </div>
  );
};

export default ArticlesContainer;
