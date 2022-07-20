import React, {useState} from 'react'
import Nav from '../components/Nav'
import { useNavigate } from "react-router-dom"
import Footer from '../components/Footer';

function Onboarding({ userSignedIn, accessToken, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
  let navigate = useNavigate()
  userSignedIn = localStorage.getItem('user')
  const endpoint = 'users/'
  const [formData, setFormData] = useState({
    username: userSignedIn,
    first_name: "",
    last_name: "",
    dob_month: "",
    dob_day: "",
    dob_year: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    cell: "",
    url: "",
    about: "",
    beSitter: false
  })

  const [networkErrMsg, setNetworkErrMsg] = useState(null)
  // eslint-disable-next-line
  const [clientErrMsg, setClientErrMsg] = useState(null)

  const statusCodeToErr = (responseObj) => {
      setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
      // TODO - console log the err message
  }

  const clientFormValidation = (formData) => {
      const blankFields = Object.entries(formData)
                                .filter(kv => kv[1] === '')
      if (blankFields.length > 0) {
          setClientErrMsg(`${blankFields[0][0]} can not be blank`)
          return false
      }
      setClientErrMsg(null)
      return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNetworkErrMsg(null)

    if (!clientFormValidation(formData)) {
      return
    }
    
    else {
      const apiUrl = process.env.REACT_APP_API_URL
      console.log(`fetching with token ${accessToken}`)

      fetch(apiUrl + endpoint,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': ` Bearer ${accessToken}`
          },
          body: JSON.stringify(formData)
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
            console.log(`problem with network request: ${networkErrMsg}`)
          } else {
          
            console.log(data)

            // call to refresh the list
            // set RefreshCounter(refreshCounter + 1)
          }
        })

      console.log(formData)
      formData.beSitter ? navigate('/add') : navigate('/dashboard')
    }
  }
  const handleChange = (e) => {
    console.log('e', e)
    const value = e.target.type === "checkbox" ? true : e.target.value
    const name = e.target.name
    console.log(value, name)
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  return (
    <>
    <div className='onboarding'>
      <Nav
          setShowModal={setShowModal}
          showModal={showModal}
          setIsSignUp={setIsSignUp}
          isSignUp={isSignUp}
          userSignedIn={userSignedIn}
          setUserSignedIn={setUserSignedIn}
          setAccessToken = {setAccessToken}
        />
        <h1>CREATE ACCOUNT</h1>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor='first_name'>First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange = {handleChange}
            />
            <label htmlFor='last_name'>Last Name</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Last Name"
              required={true}
              value={formData.last_name}
              onChange = {handleChange}
            />
            <label>Birthday</label>
            <div className='multiple-input-container'>
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange = {handleChange}
              />
            <input
              id="dob_day"
              type="number"
              name="dob_day"
              placeholder="DD"
              required={true}
              value={formData.dob_day}
              onChange = {handleChange}
            />
            <input
              id="dob_year"
              type="number"
              name="dob_year"
              placeholder="YYYY"
              required={true}
              value={formData.dob_year}
              onChange = {handleChange}
              />
            </div>

            <label>Address</label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Street"
              required={true}
              value={formData.address}
              onChange = {handleChange}
            />
            <div className='address-multiple-input-container'>
            <input
              id="city"
              type="text"
              name="city"
              placeholder="City"
              required={true}
              value={formData.city}
              onChange = {handleChange}
            />
              <input
              id="state"
              type="text"
              name="state"
              placeholder="State"
              required={true}
              value={formData.state}
              onChange = {handleChange}
            />
            <input
              id="zipcode"
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              required={true}
              value={formData.zipcode}
              onChange = {handleChange}
              />
            </div>
            <label htmlFor='cell'>Phone Number</label>
            <input
              id="cell"
              type="text"
              name="cell"
              placeholder="Cellphone Number"
              required={true}
              value={formData.cell}
              onChange = {handleChange}
            />
            
            
          </section>

          <section>

          <label htmlFor='about'>About Me</label>
            <input
              id='about'
              type="textbox"
              name='about'
              required={true}
              value={formData.about}
              onChange={handleChange}
            />
            <label htmlFor='url'>Profile Pirture</label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder = "URL"
              onChange={handleChange}
              required={true}
            />
            <div className='photo-container'>
              <img src={formData.url} alt="Profile Pic Preview"></img>
            </div>

            <label htmlFor='beSitter'>Would like to become a cat sitter</label>
            <input
              id="beSitter"
              type="checkbox"
              name="beSitter"
              onChange={handleChange}
              checked={formData.beSitter}
            />
            {!formData.beSitter && <input type="submit"></input>}
          {formData.beSitter && <input type="submit" value="One More Step to Become A Sitter!"></input>}

          </section>
          
        </form>
        <Footer />
      </div>
    </>
  )
}

export default Onboarding