import React from 'react'
import Nav from '../components/Nav'

function About({ userSignedIn, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
    userSignedIn = localStorage.getItem('user')
  return (
      <div className='about'>
          <Nav
          setShowModal={setShowModal}
          showModal={showModal}
          setIsSignUp={setIsSignUp}
          isSignUp={isSignUp}
          userSignedIn={userSignedIn}
          setUserSignedIn={setUserSignedIn}
          setAccessToken = {setAccessToken}
          />
          <div className='main'>
              <h1>About Catty</h1>
              <p>We're on a mission to help every cat and cat parent live their best life.</p>
              <h1>Why Catty?</h1>
              <p>No more cages, kennels, growls, or yowls. Cats deserve quality, in-home care and that's why we've created a nationwide network of trusted and insured cat sitters who can bring the purrfect hospitality to you!</p>
          </div>

          
    </div>
  )
}

export default About