import React, {useState} from 'react'
import AuthModal from './AuthModal'
import { BiSearch,BiMessageAltCheck } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import SearchForm from './SearchForm'

function Nav({userSignedIn, setAccessToken, setUserSignedIn,setShowModal, showModal, setIsSignUp, isSignUp }) {
  const [userSearch,setUserSearch] = useState(false)  
  
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

    return (
        <nav>
            <div className = 'left-container'>
                <div className="logo-container">
                <a href='/'><h1>CATTY</h1></a> 
                </div>
            </div>
            <div className='mid-container'>
                <h3 onClick = {handleSearch}><BiSearch /> Search Sitters&nbsp;&nbsp;</h3>
                <h3><AiOutlineHeart /> Become a Sitter&nbsp;&nbsp;</h3>
                <h3><BiMessageAltCheck /> About Us</h3>
            </div>
            <div className='nav-buttons'>
            {userSignedIn ? null :  <button
                className="nav-button"
                onClick={handleLogin}
                disabled = {showModal}>Log In</button>}
            <button className = "nav-button" onClick = {handleClick}>
              {userSignedIn ? "My Account" : "Create Account"}
                </button>
          {showModal && <AuthModal
            setShowModal={setShowModal}
            isSignUp={isSignUp}
            userSignedIn={userSignedIn}
          setUserSignedIn={setUserSignedIn}
          setAccessToken = {setAccessToken}
          />}
          {userSearch && <SearchForm
            setUserSearch={setUserSearch}/>}
            
        </div>
        </nav>
  )
}

export default Nav