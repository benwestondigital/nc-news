import '../css/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="Header">
      <div className="Header__box Header__logo">
        <Link className="Header__text-link" to="/">
        <i className="far fa-newspaper"></i>
        </Link>
      </div>
      <h1>NC News</h1>
      <div className="Header__box Header__user"><i className="far fa-user"></i></div>
    </div>
  );
};

export default Header;
