import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

function Navbar() {
  const { user } = useContext(AuthContext);
  return (
      <div className='navbar'>
        <div className='navContainer'>
          <Link to="/" style={{ color: "inherit", textDecoration :"none"}}>
                  <span className='logo'>bookmyhotel</span>
          </Link>
        {user ? (`Welcome ${user.username}`) : (
          <div className="navItems">
              <button className="navButton">Register</button>
              <Link to="/login">
                  <button className="navButton">Login</button>
              </Link>
          </div>
        )}
        </div>
      </div>
  )
}

export default Navbar;