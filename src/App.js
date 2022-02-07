import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Header from './components/Header';
import ArticlesContainer from './components/ArticlesContainer';
import Topics from './components/Topics';
import SingleArticle from './components/SingleArticle';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ArticlesContainer />} />
          <Route path="/topics/:topic_id" element={<Topics />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
