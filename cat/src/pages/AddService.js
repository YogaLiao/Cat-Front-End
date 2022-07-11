import React, {useState} from 'react'
import Nav from '../components/Nav'
import { useNavigate } from "react-router-dom"
import DatePicker from "react-multi-date-picker"

function AddService({ userSignedIn, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: userSignedIn,
        displayName: userSignedIn,
        headline: "",
        service: "onboarding",
        rate: 20,
        clientNum: 3,
        availability: ["S", "M", "T", "W", "T", "F", "S"]
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
        console.log(formData)
        navigate('/dashboard')
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

    const handleCheck = (e) => {
        setFormData({ ...formData, service: e.target.value })
        console.log(formData.service)
    }
        


  return (
      <div className="add-service">
          <Nav
          setShowModal={setShowModal}
          showModal={showModal}
          setIsSignUp={setIsSignUp}
          isSignUp={isSignUp}
          userSignedIn={userSignedIn}
          setUserSignedIn={setUserSignedIn}
          setAccessToken = {setAccessToken}
          />
          <h2>Complete below Information to Start</h2>
          <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor='displayName'>Display name </label>
            <input
              id="displayName"
              type="text"
              name="displayName"
              placeholder="Display Name as"
              required={true}
              value={formData.displayName}
              onChange = {handleChange}
            />
          <label htmlFor='headline'>Headline</label>
            <input
              id="headline"
              type="text"
              name="headline"
              placeholder="Your pets home away from home!"
              required={true}
              value={formData.headline}
              onChange = {handleChange}
            />
            <label className = "search-title">What service would you like to provide?</label>
            <div className='multiple-input-container'>
            <input
              id="boarding"
              type="radio"
              name="service"
              value="boarding"
                      onChange={handleCheck}
                      checked = {formData.service === "boarding"}
              />
              <label htmlFor='boarding'>Boarding</label>
              <input
              id="housesitting"
              type="radio"
              name="service"
                value="housesitting"
                onChange={handleCheck}
                checked={formData.service === "housesitting"}
              />
              <label htmlFor='housesitting'>House Setting</label>
              <input
              id="dropin"
              type="radio"
              name="service"
                      value="dropin"
                      onChange={handleCheck}
                checked={formData.service === "dropin"}
              />
              <label htmlFor='dropin'>Drop-In Visits</label>
                  </div>
            <label htmlFor='rate'>Rate ($/each visit)</label>
            <input
              id="rate"
              type="number"
              name="rate"
            required={true}
            placeholder="20"
              value={formData.rate}
              onChange = {handleChange}
                  />
             <label htmlFor='clientNum'>How many visits per day?</label>
            <input
              id="clientNum"
              type="number"
              name="clientNum"
            required={true}
            placeholder="3"
              value={formData.clientNum}
              onChange = {handleChange}
                  />
            
            </section>
              <section>
                  <DatePicker 
                      weekDays={formData.availability}
                      format="week day name: ddd (dddd), month name: MMM (MMMM) of YYYY"
                      formattingIgnoreList={["week", "day", "name", "month", "of"]}
                      containerStyle={{ width: "100%" }}
                      style={{ 
                        width: "100%", 
                        height: "26px", 
                        boxSizing: "border-box" 
                      }}/>
            </section>
          </form>
    </div>
  )
}

export default AddService