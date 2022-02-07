import '../css/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="Header">
      <div className="Header__box Header__logo">
        <Link className="Header__text-link" to="/">
          Logo
        </Link>
      </div>
      <h1>NC News</h1>
      <div className="Header__box Header__user">User</div>
    </div>
  );
};

export default Header;
