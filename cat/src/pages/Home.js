import React, { useState, useEffect} from 'react'
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import Footer from '../components/Footer'

function Home({userSignedIn,setUserSignedIn,setAccessToken, showModal, setShowModal, isSignUp, setIsSignUp}) {
  console.log(userSignedIn)
  userSignedIn = localStorage.getItem('user')
  console.log(localStorage.getItem('user'))
  console.log(userSignedIn)

  return (
      <>
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
        <Footer />
      </div>
      </>
  )
}

export default Home