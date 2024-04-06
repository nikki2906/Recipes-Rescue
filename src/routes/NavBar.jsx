import { Outlet, Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';


const NavBar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <h1 className="fa-solid fa-utensils"> Recipes Rescue</h1>
        </Link>
       
        <ul>
          <li className="nav-item">
            <Link to="/">
              <i className="fa-solid fa-house"></i>Home
            </Link>
          </li>
          <li className="nav-item">
            <i className="fa-solid fa-magnifying-glass"></i>Search
          </li>
          <li className="nav-item">
            <i className="fa-solid fa-circle-info"></i>About
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;
