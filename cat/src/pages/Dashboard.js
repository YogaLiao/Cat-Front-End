import React, { useState } from 'react'
import AvaiCalendar from '../components/AvaiCalendar'

function Dashboard({userSignedIn, setAccessToken, setUserSignedIn,setShowModal, showModal, setIsSignUp, isSignUp }) {
  const characters = [
    {
      name: 'Richard Hendricks',
      url: './img/richard.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: './img/erlich.jpg'
    },
    {
      name: 'Monica Hall',
      url: './img/monica.jpg'
    },
    {
      name: 'Jared Dunn',
      url: './img/jared.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      url: './img/dinesh.jpg'
    }
  ]


  return (
    <h1>
      <AvaiCalendar 
      setShowModal={setShowModal}
      showModal={showModal}
      setIsSignUp={setIsSignUp}
      isSignUp={isSignUp}
      userSignedIn={userSignedIn}
      setUserSignedIn={setUserSignedIn}
        setAccessToken={setAccessToken}
      />
    </h1>
  )
}

export default Dashboard