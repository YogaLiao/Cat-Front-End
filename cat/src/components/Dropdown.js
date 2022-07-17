import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dropdown({ setUserSignedIn, setAccessToken }) {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <ul
        className={dropdown ? "services-submenu clicked" : "services-submenu"}
        onClick={() => setDropdown(!dropdown)}
      >
            <li className="submenu-item">
              <Link
                to="/dashboard"
                onClick={() => setDropdown(false)}
              >
                Dashboard
              </Link>
            </li>
              <li
                  className="submenu-item"
                  onClick={() => {
                      setDropdown(false)
                        setUserSignedIn(null)
                        setAccessToken(null)
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')
                        localStorage.removeItem('user')
                    localStorage.clear()
                    
                      console.log(localStorage)
                    navigate('/')
                    window.location.reload(false)
                  }}
              >
                Log Out
            </li>
          
      </ul>
    </>
  );
}

export default Dropdown;