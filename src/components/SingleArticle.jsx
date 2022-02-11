import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Article from './Article';
import ErrorPage from './ErrorPage';
import CommentsContainer from './CommentsContainer';
import { getSingleArticle } from '../utils/api';
const Spinner = require('react-spinkit');

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
        console.log(err);
        setIsError(err);
      }
    };
    fetchSingleArticle();
  }, [article_id]);

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return isLoading ? (
       <>
      <p>Loading...</p>
      <Spinner name="circle" />
    </>
  ) : (
    <>
      <div>
        <Article data={article} />
        <CommentsContainer article_id={article_id} />
      </div>
    </>
  );
};

export default SingleArticle;
