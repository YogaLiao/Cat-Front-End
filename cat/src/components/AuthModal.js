import React, {useState} from 'react'

function AuthModal({ setShowModal, isSignUp}) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)


    const handleClick = () => {
    setShowModal(false)
    }

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      if (isSignUp && (password !== confirmPassword)) {
        setError("Passwords need to match!")
      }
      console.log("make a post request to our database")
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
      <div className = "auth-modal">
      <div className='close-icon' onClick={handleClick}>ⓧ</div>
      <h2>{isSignUp ? 'CREATE ACCOUNT' : "LOGIN"}</h2>
      <p>By clicking Login, you agree to our terms. Learn how we protect your data in our Privacy Policy and Cookie Policy.</p>
      <form onSubmit = {handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={e => setPassword(e.target.value)}
        />
        {isSignUp ? <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="confirmPassword"
          required={true}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        : null }
        <input className = "secondary-button" type="submit" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
          AUTH MODEL
    </div>

  )
}

export default AuthModal