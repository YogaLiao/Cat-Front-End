import React, {useState} from 'react'
import Nav from '../components/Nav'
import { useNavigate } from "react-router-dom"
import { Calendar } from "react-multi-date-picker"
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import axios from 'axios';

function AddService({ userSignedIn, accessToken, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
  let navigate = useNavigate()
  userSignedIn = localStorage.getItem('user')
  const [checkData, setCheckData] = useState(true)
  const endpoint = "services/"

  const [networkErrMsg, setNetworkErrMsg] = useState(null)
  const [clientErrMsg, setClientErrMsg] = useState(null)

  const statusCodeToErr = (responseObj) => {
      setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
      // TODO - console log the err message
  }
  const checkInput = (formData) => {
    const checkPoint = `services/?service=${formData.service}`
    axios.get(process.env.REACT_APP_API_URL + checkPoint)
      .then(data => {
        console.log(data.data)
        if (data.data.length > 0) {
          let info = data.data.filter(x => x.user == userSignedIn)
          if (info.length > 0) {
            setClientErrMsg("This service has already been listed")
            console.log("here")
            setCheckData(false)
          }
        }
        setClientErrMsg(null)
          console.log('yah')
        
      })
    return checkData
  }
  
    const [dates, setDates] = useState(new Date())

    const [formData, setFormData] = useState({
        user: userSignedIn,
        displayName: userSignedIn,
        headline: "",
        service: "onboarding",
        rate: 20,
        note:"",
        disable: []
    })
    
  const handleSubmit = (e) => {
    e.preventDefault()
    setNetworkErrMsg(null)
    console.log(formData)
    console.log(checkInput(formData))
    if (checkInput(formData)) {
      console.log("submitted")
      console.log(formData)
      console.log(dates[0].format())
      console.log(dates[1].format())
      let dateCopy = formData.disable
      dates.map(date => {
        // date = new DateObject()
        date = date.format();
        dateCopy.push(date)
      })
      setFormData({ ...formData, disable: dateCopy })
      console.log(formData)
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

      navigate('/dashboard')
    }
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
          <h1>Adding Your Service</h1>
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
          <p>{clientErrMsg}</p>
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
          
            <label htmlFor='note'>Any special note to your clients?</label>
            <input
              id="note"
              type="text"
              name="note"
              placeholder=""
              required={false}
              value={formData.note}
              onChange = {handleChange}
            />
            </section>
              <section>
                  <label>Availability </label>
                <p>* Select all dates you are <span style={{background:"#cfbaf0"}}> not</span> available, you are able to adjust in your account later</p>
              {/* <DatePicker
            calendarPosition="bottom-left"
            fixMainPosition
            value={dates}
            placeholder='Add Dates'
                  minDate={new DateObject().toFirstOfMonth()}
                  maxDate={new DateObject().toLastOfMonth()}
                  onChange={dateObjects => {
                    setDates(dateObjects)
                    setAllDates(getAllDatesInRange(dateObjects))
                  }}
                  plugins={[
                    <DatePanel eachDaysInRange />
                  ]}
                  /> */}
                  {/* <DatePicker
                    // render={<Icon/>}
                    multiple
                    className='date'
                    selected={dates}
                    onChange={(item) => setDates([item.selection])}
                    showTimeSelect
                      dateFormat="Pp"
                    plugins={[
                        <DatePanel />
                       ]}
                  /> */}
                  <Calendar
                      multiple
                      value={dates}
                      selected={dates}
                      onChange={setDates}
                      minDate={new Date()}
                      />
                      {/* plugins={[
                          <DatePanel dates />
                      
                      ]} */}
                  
              <input type="submit"></input>
              </section>
          </form>
    </div>
  )
}

export default AddService