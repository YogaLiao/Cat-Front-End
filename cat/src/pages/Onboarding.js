import React, {useState} from 'react'
import Nav from '../components/Nav'

function Onboarding({userSignedIn, setAccessToken, setUserSignedIn,setShowModal, showModal, setIsSignUp, isSignUp }) {
  const [formData, setFormData] = useState({
    username: userSignedIn,
    email: localStorage.formData.email,
    first_name: "",
    last_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    address: "",
    city: "",
    state: "",
    zipcode: 75206,
    url: "",
    about: "",
    beSitter: false
  })


  const handleSubmit = () => {
    console.log("submitted")
  }
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
        <h2>CREATE ACCOUNT</h2>
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
              id="dob_day"
              type="number"
              name="dob_day"
              placeholder="DD"
              required={true}
              value={formData.dob_day}
              onChange = {handleChange}
            />
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
              type="number"
              name="zipcode"
              placeholder="Zipcode"
              required={true}
              value={formData.zipcode}
              onChange = {handleChange}
              />
            </div>
            
            {!formData.beSitter && <input type="submit"></input>}
          </section>

          <section>

          <label htmlFor='About'>About Me</label>
            <input
              id='about'
              type="textbox"
              name='about'
              required={true}
              value={formData.about}
              onChange={handleChange}
            />
            <label htmlFor='about'>Profile Pirture</label>
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
            {formData.beSitter && <input type="submit" value="Next Step"></input>}

          </section>

        </form>
      </div>
    </>
  )
}

export default Onboarding