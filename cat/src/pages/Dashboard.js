import React, { useState } from 'react'
import AvaiCalendar from '../components/AvaiCalendar'
import Calendar2 from '../components/Calendar2'
import Nav from '../components/Nav'
function Dashboard({userSignedIn, setAccessToken, setUserSignedIn,setShowModal, showModal, setIsSignUp, isSignUp }) {
  

  return (
    <div className="dashboard">
      <Nav
          setShowModal={setShowModal}
          showModal={showModal}
          setIsSignUp={setIsSignUp}
          isSignUp={isSignUp}
          userSignedIn={userSignedIn}
          setUserSignedIn={setUserSignedIn}
          setAccessToken = {setAccessToken}
        />
      <AvaiCalendar 
      setShowModal={setShowModal}
      showModal={showModal}
      setIsSignUp={setIsSignUp}
      isSignUp={isSignUp}
      userSignedIn={userSignedIn}
      setUserSignedIn={setUserSignedIn}
        setAccessToken={setAccessToken}
    />
    {/* <Calendar2 /> */}
  </div>
  )
}

export default Dashboard