
import CartIcon from "./CartIcon";
import { NavLink , Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
           <Link to={"/"} className="logo"> <h3>Fake API Store</h3></Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        end
                    >
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/about"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        About Us
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/contact"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        Contact
                    </NavLink>
                </li>
            </ul>
            <CartIcon/>
        </nav>
    );
};

export default Navbar;