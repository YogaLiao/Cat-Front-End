import React, { useState,useEffect } from 'react'
import ServicePanel from '../components/ServicePanel'
import Calendar2 from '../components/Calendar2'
import Nav from '../components/Nav'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

function Dashboard({ accessToken,userSignedIn, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
  userSignedIn = localStorage.getItem('user')
  let navigate = useNavigate()
  console.log(userSignedIn)

  const userEndpoint = 'users/'
  const [userInfo, setUserInfo] = useState([])
  const [userId, setUserId] = useState()
  const [formData, setFormData] = useState({
    username: userSignedIn,
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    dob_month: userInfo.dob_month,
    dob_day: userInfo.dob_day,
    dob_year: userInfo.dob_year,
    address: userInfo.address,
    city: userInfo.city,
    state: userInfo.state,
    zipcode: userInfo.zipcode,
    cell: userInfo.cell,
    url: userInfo.url,
    about: userInfo.about
  })

  const handleChange = (e) => {
    console.log('e', e)
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    const name = e.target.name
    console.log(value, name)
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + userEndpoint)
      .then(data => {
        let info = data.data.filter(x => x.username == userSignedIn)
        console.log(info)
        setUserInfo(info[0])
        setFormData(userInfo)
        setUserId(userInfo.id)
      })
  }, [])
console.log(userInfo)
  const [networkErrMsg, setNetworkErrMsg] = useState(null)
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

  const handleUpdate = (e) => {
    e.preventDefault()
    setNetworkErrMsg(null)

      if (!clientFormValidation(formData)) {
          return
      }
    
    const apiUrl = process.env.REACT_APP_API_URL
    console.log(`fetching with token ${accessToken}`)

    fetch( apiUrl + userEndpoint + userId,       
      {
          method: 'PUT',
          headers: {
              'Content-Type':'application/json',
              'Authorization':` Bearer ${accessToken}`
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
    navigate('/dashboard')
  }

  return (
  <>
    {!userInfo
      ? "Loading"
      : <div className="dashboard">
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
          <section className="top-container">
            <div>
              
              <div className="panel">
                <div className='img-container'>
                  <img src={userInfo.url}></img>
                </div>
                <div className='info'>
                  <p className="name">{userInfo.first_name} {userInfo.last_name}</p>
                  <p>{userInfo.city}, {userInfo.state}</p>
                </div>
              </div>
                
            </div>
          </section>
          <section className='bottom-container'>
            <div className="servicePanel">
            
              <ServicePanel
                userSignedIn={userSignedIn}
              />
            </div>
                
            <div className="profile">
              <h1>Edit Profile</h1>
              <form onSubmit={handleUpdate}>
                <section>
                  <label htmlFor='first_name'>First Name</label>
                  <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder={userInfo.first_name}
                      // required={true}
                      // defaultValue={userInfo.first_name}
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  <label htmlFor='last_name'>Last Name</label>
                  <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    placeholder={userInfo.last_name}
                    // required={true}
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                  <label>Birthday</label>
                  <div className='multiple-input-container'>
                    <input
                      id="dob_month"
                      type="number"
                      name="dob_month"
                      placeholder={userInfo.dob_month}
                      // required={true}
                      value={formData.dob_month}
                      onChange={handleChange}
                    />
                    <input
                      id="dob_day"
                      type="number"
                      name="dob_day"
                      placeholder={userInfo.dob_day}
                      // required={true}
                      value={formData.dob_day}
                      onChange={handleChange}
                    />
                    <input
                      id="dob_year"
                      type="number"
                      name="dob_year"
                      placeholder={userInfo.dob_year}
                      // required={true}
                      value={formData.dob_year}
                      onChange={handleChange}
                    />
                  </div>

                  <label>Address</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder={userInfo.address}
                    // required={true}
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <div className='address-multiple-input-container'>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      placeholder={userInfo.city}
                      // required={true}
                      value={formData.city}
                      onChange={handleChange}
                    />
                    <input
                      id="state"
                      type="text"
                      name="state"
                      placeholder={userInfo.state}
                      // required={true}
                      value={formData.state}
                      onChange={handleChange}
                    />
                    <input
                      id="zipcode"
                      type="text"
                      name="zipcode"
                      placeholder={userInfo.zipcode}
                      // required={true}
                      value={formData.zipcode}
                      onChange={handleChange}
                    />
                  </div>
                  <label htmlFor='cell'>Phone Number</label>
                  <input
                    id="cell"
                    type="text"
                    name="cell"
                    placeholder={userInfo.cell}
                    // required={true}
                    value={formData.cell}
                    onChange={handleChange}
                  />
                </section>
                <section>

                  <label htmlFor='about'>About Me</label>
                  <input
                    id='about'
                    type="text"
                    name="about"
                    placeholder={userInfo.about}
                    // required={true}
                    value={formData.about}
                    onChange={handleChange}
                  />
                  <label htmlFor='url'>Profile Pirture</label>
                  <input
                    type="url"
                    name="url"
                    id="url"
                    placeholder={userInfo.url}
                    value={formData.url}
                    onChange={handleChange}
                    // required={true}
                    />
                    <div className='photo-container'>
              <img src={formData.url} alt="Profile Pic Preview"></img>
                    </div>
                
                  <input type="submit" value = "Update Profile"></input>
                  </section>
              </form>
                  {/* <input type="submit" value = "Delete Account" className='delete'></input> */}
            </div>
          </section>
        </div>
        {/* <Calendar2 /> */}
      </div>
}
</>)
}

export default Dashboard