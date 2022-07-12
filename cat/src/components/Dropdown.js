import React, { useState } from "react";
import { Link } from "react-router-dom";

function Dropdown({setUserSignedIn, setAccessToken}) {
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
                    
                  }}
              >
                Log Out
            </li>
          
      </ul>
    </>
  );
}

export default Dropdown;