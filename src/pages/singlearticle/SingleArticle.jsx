import Article from './Article';
import ErrorPage from '../../components/ErrorPage';
import LoadingSpinner from '../../components/Loading';
import CommentsContainer from './CommentsContainer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleArticle } from '../../utils/api';

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const singleArticle = await getSingleArticle(article_id);
        setArticle(singleArticle);
        setIsLoading(false);
      } catch (err) {
        setIsError(err);
      }
    };
    fetchSingleArticle();
  }, [article_id]);

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div>
        <Article data={article} setArticle={setArticle} />
        <CommentsContainer article_id={article_id} />
      </div>
    </>
  );
};

export default SingleArticle;
