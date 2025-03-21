import { NavLink, useLocation } from "react-router-dom";
import LogoSvg from "@/assets/images/logo.svg";
import { useEffect } from "react";

function Navbar({ navItems = [] }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light p-2 position-sticky top-0 z-1 w-100">
        <NavLink className="navbar-brand" to="/">
          <img src={LogoSvg} alt="Logo" width={40} height={40} />
        </NavLink>
        <ul className="navbar-nav">
          {navItems.map((item, i) => (
            <li className="nav-item" key={`nav-item-${item.path}-${i}`}>
              <NavLink className="nav-link" to={item.path}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
