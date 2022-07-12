import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AuthModal({ setShowModal, isSignUp, setUserSignedIn, setAccessToken }) {
  const [formInfo, setFromInfo] = useState(null)
  // const [email, setEmail] = useState(null)
  // const [password, setPassword] = useState(null)
  // const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const signUpEndpoint = 'api/signup/'
  const loginEndpoint = 'api/token/'

  const statusCodeToErr = (responseObj) => {
    if (responseObj.status == 401)
    setError('Please check your username and/or password')
}
    const handleClick = () => {
    setShowModal(false)
    }
    const handleChange = (e) => {
      setFromInfo({...formInfo, [e.target.id]: e.target.value})
  }
  
  const passwordValidation = (password, confirmPassword) => {
    if (password !== confirmPassword) 
    {
      setError("Passwords need to match!")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const apiUrl = process.env.REACT_APP_API_URL
    setError(null)
    if (isSignUp) {
      passwordValidation(formInfo.password, formInfo.confirmPassword)
      fetch(apiUrl + signUpEndpoint,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formInfo)
        })
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            statusCodeToErr(res)
            return Promise.resolve(null)
          }
        })
        .then(data => {
          if (!data) {
            console.log(`problem with network request: ${error}`)
          } else {
              
            console.log(data)
              
            // setUserSignedIn(data.username)
            setShowModal(false)
              

            // add tokens to localstorage here

            localStorage.setItem('formData', JSON.stringify(formInfo));
            localStorage.setItem('access_token', data.access)
            localStorage.setItem('user', formInfo.username)
            localStorage.setItem('refresh_token', data.refresh)
            console.log(localStorage)
            // redirect here
            navigate('/onboarding')
          }
        })
    }
    else {
      fetch(apiUrl + loginEndpoint,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formInfo)
        }
      )
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          statusCodeToErr(res)
          return Promise.resolve(null)
        }
      })
      .then(data => {
        if (!data) {
          console.log(`problem with network request: ${error}`)
        } else {
          
          console.log(data)

          // setUserSignedIn(formInfo.username)
          console.log(formInfo)
          setShowModal(false)
          // setUserSignedIn("jwt_user")

          // add tokens to localstorage here
          setAccessToken(data.access)

          localStorage.setItem('access_token', data.access)
          localStorage.setItem('user', formInfo.username)
          localStorage.setItem('refresh_token', data.refresh)
          // redirect here
          console.log(localStorage)
          navigate('/')
        }
      })
    }
  }
  return (
      <div className = "auth-modal">
      <div className='close-icon' onClick={handleClick}>ⓧ</div>
      <h2>{isSignUp ? 'CREATE ACCOUNT' : "LOGIN"}</h2>
      <p>By clicking Login, you agree to our terms. Learn how we protect your data in our Privacy Policy and Cookie Policy.</p>
      <form onSubmit = {handleSubmit}>
        {isSignUp ? 
          <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={handleChange}
        />
        : null}
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          required={true}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={handleChange}
        />
        {isSignUp ? <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="confirmPassword"
          required={true}
          onChange={handleChange}
        />
        : null }
        <input className = "secondary-button" type="submit" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>CATTY</h2>
    </div>

  )
}

export default AuthModal