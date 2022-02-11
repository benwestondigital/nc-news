import '../css/ArticlesContainer.css';
import ArticlePreview from '../components/ArticlePreview';
import Nav from '../components/Nav';
import ErrorPage from './ErrorPage';
import LoadingSpinner from './Loading';
import { useState, useEffect } from 'react';
import { getArticles } from '../utils/api';

const ArticlesContainer = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [searchQueries, setSearchQueries] = useState({
    topic: '',
    sort_by: 'created_at',
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const apiArticles = await getArticles(searchQueries);
        setArticles(apiArticles);
        setIsLoading(false);
      } catch (err) {
        setIsError(err);
      }
    };
    fetchArticles();
  }, [searchQueries]);

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="ArticlesContainer">
      <Nav searchQueries={searchQueries} setSearchQueries={setSearchQueries} />
      {articles.map(article => {
        return <ArticlePreview key={article.article_id} data={article} />;
      })}
    </div>
  );
};

export default ArticlesContainer;
