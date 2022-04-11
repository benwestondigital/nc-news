import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './common/css/App.css';
import Header from './common/components/Header';
import User from './pages/user/User';
import ArticlesContainer from './pages/home/ArticlesContainer';
import SingleArticle from './pages/singlearticle/SingleArticle';
import ErrorPage from './common/components/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App__container">
        <main className="App">
          <Header />
          <Routes className="routes">
            <Route path="/" element={<ArticlesContainer />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/user" element={<User />} />
            <Route
              path="*"
              element={
                <ErrorPage>
                  <p>404 - Page Not Found</p>
                </ErrorPage>
              }
            />
            <Route
              path="/articles/*"
              element={
                <ErrorPage>
                  <p>404 - Page Not Found</p>
                </ErrorPage>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
