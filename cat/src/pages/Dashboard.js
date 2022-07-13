import React, { useState,useEffect } from 'react'
import ServicePanel from '../components/ServicePanel'
import Calendar2 from '../components/Calendar2'
import Nav from '../components/Nav'
import axios from 'axios'

function Dashboard({ userSignedIn, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
  userSignedIn = localStorage.getItem('user')
  console.log(userSignedIn)
  const userEndpoint = 'users'
  const [userInfo, setUserInfo] = useState([])
  const [formData, setFormData] = useState({})

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
      })
  }, [])

  return (
    <div className="dashboard">
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
              {!userInfo
                ? "Loading"
                :<div className="panel">
                <img src={userInfo.url}></img>
                  <div className='info'>
                  <p className = "name">{userInfo.first_name} {userInfo.last_name}</p>
                  <p>{userInfo.city}, {userInfo.state}</p>
                  </div>
                </div>
                }
          </div>
        </section>
        <section className='bottom-container'>
            <div className="servicePanel">
              <h1>Service List</h1>
              <ServicePanel
                userInfo = {userInfo}
              />
            </div>
                
          <div className="profile">
            <h1>Edit Profile</h1>
          <form>
          <section>
            <label htmlFor='first_name'>First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={userInfo.first_name}
              onChange = {handleChange}
            />
            <label htmlFor='last_name'>Last Name</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Last Name"
              required={true}
              value={userInfo.last_name}
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
                value={userInfo.dob_month}
                onChange = {handleChange}
              />
            <input
              id="dob_day"
              type="number"
              name="dob_day"
              placeholder="DD"
              required={true}
              value={userInfo.dob_day}
              onChange = {handleChange}
            />
            <input
              id="dob_year"
              type="number"
              name="dob_year"
              placeholder="YYYY"
              required={true}
              value={userInfo.dob_year}
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
              value={userInfo.address}
              onChange = {handleChange}
            />
            <div className='address-multiple-input-container'>
            <input
              id="city"
              type="text"
              name="city"
              placeholder="City"
              required={true}
              value={userInfo.city}
              onChange = {handleChange}
            />
              <input
              id="state"
              type="text"
              name="state"
              placeholder="State"
              required={true}
              value={userInfo.state}
              onChange = {handleChange}
            />
            <input
              id="zipcode"
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              required={true}
              value={userInfo.zipcode}
              onChange = {handleChange}
              />
            </div>
              </section>
              <section>
            <label htmlFor='cell'>Phone Number</label>
            <input
              id="cell"
              type="text"
              name="cell"
              placeholder="Cellphone Number"
              required={true}
              value={userInfo.cell}
              onChange = {handleChange}
              />

          <label htmlFor='About'>About Me</label>
            <input
              id='about'
              type="textbox"
              name='about'
              required={true}
              value={userInfo.about}
              onChange={handleChange}
            />
            <label htmlFor='about'>Profile Pirture</label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  value={userInfo.url}
              onChange={handleChange}
              required={true}
                />
                </section>
            </form>
        </div>
        </section>
        </div>
    {/* <Calendar2 /> */}
    </div>
  )
}

export default Dashboard