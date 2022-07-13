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
    about: ""
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
              placeholder={userInfo.first_name}
              required={true}
              value={formData.first_name}
              onChange = {handleChange}
            />
            <label htmlFor='last_name'>Last Name</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              placeholder={userInfo.last_name}
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
                placeholder={userInfo.dob_month}
                required={true}
                value={formData.dob_month}
                onChange = {handleChange}
              />
            <input
              id="dob_day"
              type="number"
              name="dob_day"
              placeholder={userInfo.dob_day}
              required={true}
              value={formData.dob_day}
              onChange = {handleChange}
            />
            <input
              id="dob_year"
              type="number"
              name="dob_year"
              placeholder={userInfo.dob_year}
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
              placeholder={userInfo.address}
              required={true}
              value={formData.address}
              onChange = {handleChange}
            />
            <div className='address-multiple-input-container'>
            <input
              id="city"
              type="text"
              name="city"
              placeholder={userInfo.city}
              required={true}
              value={formData.city}
              onChange = {handleChange}
            />
              <input
              id="state"
              type="text"
              name="state"
              placeholder={userInfo.state}
              required={true}
              value={formData.state}
              onChange = {handleChange}
            />
            <input
              id="zipcode"
              type="text"
              name="zipcode"
              placeholder={userInfo.zipcode}
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
              placeholder={userInfo.cell}
              required={true}
              value={formData.cell}
              onChange = {handleChange}
              />
              </section>
              <section>

          <label htmlFor='about'>About Me</label>
            <input
              id='about'
              type="text"
              name={userInfo.about}
              required={true}
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