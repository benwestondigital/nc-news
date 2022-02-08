import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Article from './Article';
import CommentsContainer from './CommentsContainer';
import { getSingleArticle } from '../utils/api';

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        const singleArticle = await getSingleArticle(article_id);
        setArticle(singleArticle);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleArticle();
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>
  return (
    <div>
      <Article data={article}/>
      <CommentsContainer article_id={article_id} />
    </div>
  );
};

export default SingleArticle;
