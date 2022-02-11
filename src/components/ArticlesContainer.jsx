import { useState, useEffect } from 'react';
import '../css/ArticlesContainer.css';
import Nav from '../components/Nav';
import ArticlePreview from '../components/ArticlePreview';
import { getArticles } from '../utils/api';
import ErrorPage from './ErrorPage';

const ArticlesContainer = () => {
  //piece of state for Error
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
        <ErrorPage error={err}/>
      }
    };
    fetchArticles();
  }, [searchQueries]);

  return (
    <div className="ArticlesContainer">
      <Nav searchQueries={searchQueries} setSearchQueries={setSearchQueries} />
      {articles.map(article => {
        return <ArticlePreview key={article.article_id} data={article} />;
      })}
    </div>
  );
};

export default ArticlesContainer;
