import React, {useState} from 'react'

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
    <h1>Dashboard</h1>
  )
}

export default Dashboard