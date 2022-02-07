import '../css/ArticlesContainer.css';
import Nav from '../components/Nav';
import Article from '../components/Article';

const ArticlesContainer = () => {
  return (
    <div className="ArticlesContainer">
      <Nav />
      <Article />
    </div>
  );
};

export default ArticlesContainer;
