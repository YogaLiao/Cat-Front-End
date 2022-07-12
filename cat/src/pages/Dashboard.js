import React, { useState } from 'react'
import AvaiCalendar from '../components/AvaiCalendar'
import Calendar2 from '../components/Calendar2'
function Dashboard({userSignedIn, setAccessToken, setUserSignedIn,setShowModal, showModal, setIsSignUp, isSignUp }) {
  

  return (
    <>
      <AvaiCalendar 
      setShowModal={setShowModal}
      showModal={showModal}
      setIsSignUp={setIsSignUp}
      isSignUp={isSignUp}
      userSignedIn={userSignedIn}
      setUserSignedIn={setUserSignedIn}
        setAccessToken={setAccessToken}
    />
    <Calendar2 />
  </>
  )
}

export default Dashboard