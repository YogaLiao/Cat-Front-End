import React, { useState } from 'react'
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'

function Home({userSignedIn,setUserSignedIn,setAccessToken, showModal, setShowModal, isSignUp, setIsSignUp}) {


    return (
    <div className = "overlay">
        <Nav
          setShowModal={setShowModal}
          showModal={showModal}
            setIsSignUp={setIsSignUp}
                isSignUp={isSignUp}
          userSignedIn={userSignedIn}
          setUserSignedIn={setUserSignedIn}
          setAccessToken = {setAccessToken}
        />
      <div className = "home">
                <h1 className='primary-title'>Book a</h1>
                <h1 className = 'highlight-title'>local & trusted</h1>
                <h1 className='primary-title'>cat sitter here.</h1>
            </div>
    </div>
  )
}

export default Home