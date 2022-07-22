import React, {useState, useEffect} from 'react'
import Nav from '../components/Nav'
import { useNavigate } from "react-router-dom"
import { Calendar } from "react-multi-date-picker"
import axios from 'axios';
import Footer from '../components/Footer';

function AddService({ userSignedIn, accessToken, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
  let navigate = useNavigate()
  userSignedIn = localStorage.getItem('user')
  const endpoint = "services/"
  const userEndpoint = "users/"

  const [userId, setUserId] = useState()
  const [networkErrMsg, setNetworkErrMsg] = useState(null)
  const [clientErrMsg, setClientErrMsg] = useState(null)

  const statusCodeToErr = (responseObj) => {
      setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
      // TODO - console log the err message
  }
  const checkInput = (value) => {
    const checkPoint = `search/services/?service=${value}`
    axios.get(process.env.REACT_APP_API_URL + checkPoint)
      .then(data => {
        console.log(data.data)
        let info = data.data.filter(x => x.username === userSignedIn)
        console.log(info)
        if (data.data.filter(x => x.username === userSignedIn).length > 0) {
          setClientErrMsg("This service has already been listed")
          console.log("here")
          return false
        }
        
        else {
          setClientErrMsg(null)
          console.log('yah')
          return true
        }
        
      })
  }
  
  const [dates, setDates] = useState(new Date())
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + userEndpoint)
      .then(data => 
      {
        let info = data.data.filter(x => x.username === userSignedIn)
        console.log(info)
        setUserId(info[0].id)
        setFormData({ ...formData, user: info[0].id })
      })
    // eslint-disable-next-line
  },[])
console.log(userId)
    const [formData, setFormData] = useState({
        user: "",
        displayName: userSignedIn,
        headline: "",
        service: "",
        rate: 20,
        note:"",
        disable: []
    })
    
  const handleSubmit = (e) => {
    e.preventDefault()
    setNetworkErrMsg(null)
    console.log(formData)
      console.log("submitted")
      console.log(formData)
      // console.log(dates[0].format())
      // console.log(dates[1].format())
      let dateCopy = formData.disable
      dates.map(date => {
        // date = new DateObject()
        date = date.format();
        dateCopy.push(date)
        return dateCopy
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
            navigate('/dashboard')

            // call to refresh the list
            // set RefreshCounter(refreshCounter + 1)
          }
        })

      
    
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
    console.log(e.target.value)
      if (!checkInput(e.target.value))
        {
        console.log(formData.service)
        console.log("yes")
      }
      else {
        console.log(formData.service)
        console.log("no")
    }
    }
        
console.log(formData.disable)

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
              <label htmlFor='housesitting'>House Sitting</label>
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
      <Footer />
    </div>
  )
}

export default AddService