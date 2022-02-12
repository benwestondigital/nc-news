import { UserContext } from './contexts/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './css/App.css';
import Header from './components/Header';
import User from './pages/user/User';
import ArticlesContainer from './pages/home/ArticlesContainer';
import SingleArticle from './pages/singlearticle/SingleArticle';
import ErrorPage from './components/ErrorPage';

function App() {
  const [user, setUser] = useState('weegembump');
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<ArticlesContainer />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/user" element={<User/>}/>
            <Route path="*" element={<ErrorPage><p>404 - Page Not Found</p></ErrorPage>}/>
            <Route path="/articles/*" element={<ErrorPage><p>404 - Page Not Found</p></ErrorPage>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
