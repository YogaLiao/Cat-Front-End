import React from 'react'
import AuthModal from './AuthModal'
import { BiSearch,BiMessageAltCheck } from 'react-icons/bi'
import {AiOutlineHeart} from 'react-icons/ai'

function Nav({setShowModal, showModal, setIsSignUp, isSignUp }) {
    const handleLogin = () => {
      setShowModal(true)
      setIsSignUp(false)
    }
    const handleClick = () => {
        console.log("clicked")
      setShowModal(true)
      setIsSignUp(true)
    }

  const authToken = false

    return (
        <nav>
            <div className = 'left-container'>
                <div className="logo-container">
                <a href='/'><h1>CATTY</h1></a> 
                </div>
            </div>
            <div className='mid-container'>
                <h3><BiSearch /> Search Sitters&nbsp;&nbsp;</h3>
                <h3><AiOutlineHeart /> Become a Sitter&nbsp;&nbsp;</h3>
                <h3><BiMessageAltCheck /> About Us</h3>
            </div>
        <div className = 'nav-buttons'>
            <button className = "nav-button" onClick = {handleClick}>
              {authToken ? "Sign out" : "Create Account"}
                </button>
          {showModal && <AuthModal
            setShowModal={setShowModal}
            isSignUp = {isSignUp}
          />}
            {!authToken && <button
                className="nav-button"
                onClick={handleLogin}
                disabled = {showModal}>Log In</button>}
        </div>
        </nav>
  )
}

export default Nav