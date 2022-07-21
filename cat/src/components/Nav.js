import React, {useState} from 'react'
import AuthModal from './AuthModal'
import { BiSearch,BiMessageAltCheck } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { IoMdArrowDropdown } from 'react-icons/io'
import SearchForm from './SearchForm'
import Dropdown from './Dropdown'
import { useNavigate, Link } from "react-router-dom"

function Nav({ userSignedIn, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
  const navigate = useNavigate()
  const [userSearch, setUserSearch] = useState(false)  
  const [dropdown, setDropdown] = useState(false);
  
  const handleLogin = () => {
      setShowModal(true)
      setIsSignUp(false)
    }
    const handleClick = () => {
        console.log("clicked")
      setShowModal(true)
      setIsSignUp(true)
    }
  
  const handleSearch = () => {
    setUserSearch(true)
    setShowModal(false)
  }

  const handleSitter = () => {
    userSignedIn
      ? navigate('/add')
      : setShowModal(true)
  }

    return (
        <nav>
            <div className = 'left-container'>
                <div className="logo-container">
                <a href='/'><h1>CATTY</h1></a> 
                </div>
            </div>
            <div className='mid-container'>
                <h3 onClick = {handleSearch}><BiSearch /> Search Sitters&nbsp;&nbsp;</h3>
                <h3 onClick = {handleSitter}><AiOutlineHeart /> Become a Sitter&nbsp;&nbsp;</h3>
                <Link to="/about"><h3><BiMessageAltCheck /> About Us</h3></Link>
            </div>
            <div className='nav-buttons'>
            {userSignedIn ? null :  <button
                className="nav-button"
                onClick={handleLogin}
                disabled = {showModal}>Log In</button>}
          {userSignedIn
            ?<button
              className="nav-button"
              onClick={e=> setDropdown(!dropdown)}
              >
            {userSignedIn}&nbsp;<IoMdArrowDropdown />
            </button>

          
          :<button className="nav-button" onClick={handleClick}>
              Create Account
            </button>}
          {dropdown ? <Dropdown
          setUserSignedIn={setUserSignedIn}
          setAccessToken = {setAccessToken}/> : null}
          {showModal && <AuthModal
            setShowModal={setShowModal}
            isSignUp={isSignUp}
            userSignedIn={userSignedIn}
          setUserSignedIn={setUserSignedIn}
            setAccessToken={setAccessToken}
            setIsSignUp={setIsSignUp}
          />}
          {userSearch && <SearchForm
            setUserSearch={setUserSearch}/>}
            
        </div>
        </nav>
  )
}

export default Nav