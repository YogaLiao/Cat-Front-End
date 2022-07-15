import React from 'react'
import Nav from '../components/Nav'
import Filter from '../components/Filter'

function Result({ accessToken, userSignedIn, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
    userSignedIn = localStorage.getItem('user')
    console.log(localStorage)

  return (
      <div className='results'>
          <Nav
          setShowModal={setShowModal}
          showModal={showModal}
          setIsSignUp={setIsSignUp}
          isSignUp={isSignUp}
          userSignedIn={userSignedIn}
          setUserSignedIn={setUserSignedIn}
          setAccessToken={setAccessToken}
          />
          <div className='main-content'>
            <div className='left-container'>
                  <Filter />
              </div>
              <div className='right-container'>
                  <h1>Search Results:</h1>
              </div> 
          </div>
    </div>
  )
}

export default Result