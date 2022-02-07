import '../css/Nav.css';

const Nav = () => {
  return (
    <div className="Nav">
      <form>
        <label htmlFor="topics">Topics:</label>
        <select id="topics"></select>
      </form>
      <form>
        <label htmlFor="sortby">Sort Articles By:</label>
        <select id="sortby"></select>
      </form>
    </div>
  );
};

export default Nav;
