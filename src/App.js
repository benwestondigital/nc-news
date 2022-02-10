import { UserContext } from './contexts/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './css/App.css';
import Header from './components/Header';
import User from './components/User';
import ArticlesContainer from './components/ArticlesContainer';
import Topics from './components/Topics';
import SingleArticle from './components/SingleArticle';

function App() {
  const [user, setUser] = useState('weegembump');
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<ArticlesContainer />} />
            <Route path="/topics/:topic_id" element={<Topics />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/user" element={<User/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
