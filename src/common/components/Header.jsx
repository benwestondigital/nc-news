import '../css/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="Header">
      <Link
        className="Header__box Header__logo Header__text-link far fa-newspaper"
        to="/"
      ></Link>
      <h1>
        <Link to="/" className="Header__text-link">
          NC News
        </Link>
      </h1>
      <Link
        to="/user"
        className="Header__text-link Header__box Header__user far fa-user"
      />
    </div>
  );
};

export default Header;
