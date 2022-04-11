import Article from './Article';
import { ErrorPage, Loading } from '../../common/components/index.js';
import CommentsContainer from './CommentsContainer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleArticle } from '../../common/utils/api';
import axios from 'axios';

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchSingleArticle = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const singleArticle = await getSingleArticle(article_id, source);
        setArticle(singleArticle);
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSingleArticle();
    return () => source.cancel('User cancelled operation.');
  }, [article_id]);

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Article data={article} setArticle={setArticle} />
      <CommentsContainer article_id={article_id} />
    </div>
  );
};

export default SingleArticle;
