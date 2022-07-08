import React, { useState } from 'react'
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'

function Home() {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)

    const authToken = false
    const handleClick = () => {
        console.log("clicked")
      setShowModal(true)
      setIsSignUp(true)
    }
    return (
    <div className = "overlay">
        <Nav
          minimal={false}
          setShowModal={setShowModal}
          showModal={showModal}
            setIsSignUp={setIsSignUp}
            isSignUp = {isSignUp}
        />
      <div className = "home">
                <h1 className='primary-title'>Book a</h1>
                <h1 className = 'highlight-title'>local & trusted</h1>
                <h1 className='primary-title'>cat sitter here.</h1>
            </div>
            <div className='search'>
                <h1>Book a cat sitter near you</h1>
                
        </div>
    </div>
  )
}

export default Home