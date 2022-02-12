import './css/ArticlesContainer.css';
import ArticlePreview from './ArticlePreview';
import Nav from '../../common/components/Nav';
import { ErrorPage, Loading } from '../../common/components/index';
import { useState, useEffect } from 'react';
import { getArticles } from '../../common/utils/api';

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
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, [searchQueries]);

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return isLoading ? (
    <Loading />
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
