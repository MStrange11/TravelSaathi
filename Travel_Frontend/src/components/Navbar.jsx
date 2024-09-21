import "./css/NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({isAuthenticated}) {
  const [state, setState] = useState(false);
  const navigate = useNavigate()


  const handleClick = () => {
    // Toggle state between true and false
    setState(!state);
  };

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">TravelSaathi</h1>

      {/* Menu icon, toggles between bars and times */}
      <div className="menu-icons" onClick={handleClick}>
        <i className={state ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      {/* Toggle menu visibility based on state */}
      <ul className={state ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.url} className={item.cName} onClick={() => { scrollTo(0, 0) }}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
          );
        })}
        {isAuthenticated ?<button className="navbar-button" onClick={() => { navigate(`/account`) }}>Account</button> :<button className="navbar-button" onClick={() => { navigate(`/sign`) }}>Sign Up</button>}
        
      </ul>
    </nav>
  );
}

export default Navbar;
