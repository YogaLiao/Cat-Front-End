import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import {useNavigate} from "react-router-dom"

function EditService({ id, setEdit, accessToken, userSignedIn }) {
    const navigate = useNavigate()
    console.log({ id })
    console.log(localStorage)
    const endpoint = `services/${id}`
    console.log(endpoint)
    const [networkErrMsg, setNetworkErrMsg] = useState(null)
    const [clientErrMsg, setClientErrMsg] = useState(null)

  const statusCodeToErr = (responseObj) => {
      setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
      // TODO - console log the err message
  }
    const [serviceDetail, setServiceDetail] = useState([])
    const [dates,setDates] = useState([])

    const getData = () => {
        axios.get(process.env.REACT_APP_API_URL + endpoint)
        .then(data => {
            setServiceDetail(data.data)
            let copy = []
            data.data.disable.map(x => copy.push(new Date(x)))
            setDates(copy)
        })
    }
    useEffect(() => {getData()
        
    }, [])
    
    const handleChange = (e) => {
        setServiceDetail(((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
          })))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setNetworkErrMsg(null)
        console.log(dates)
          console.log("submitted")
          console.log(serviceDetail)
          // console.log(dates[0].format())
          // console.log(dates[1].format())
          let dateCopy = []
          dates.map(date => {
            // date = new DateObject()
            date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`;
            dateCopy.push(date)
          })
          setServiceDetail({ ...serviceDetail, disable: dateCopy })
          console.log(serviceDetail)
          const apiUrl = process.env.REACT_APP_API_URL
          console.log(`fetching with token ${accessToken}`)
    
          fetch(apiUrl + endpoint,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${accessToken}`
              },
              body: JSON.stringify(serviceDetail)
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
                  setEdit(false)
                //   setServiceDetail()
                  
    
                // call to refresh the list
                // set RefreshCounter(refreshCounter + 1)
              }
            })
    
        navigate('/dashboard')
        window.location.reload(false)

        
    }
    
    const handleDelete = (e) => {
        e.preventDefault()
        setNetworkErrMsg(null)
        const apiUrl = process.env.REACT_APP_API_URL
        console.log(`fetching with token ${accessToken}`)
  
        fetch(apiUrl + endpoint,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': ` Bearer ${accessToken}`
            },
          }
        )
          .then(res => {
            if (res.ok) {
            //   return res.json()
            setEdit(false)
            } else {
              statusCodeToErr(res)
              return Promise.resolve(null)
            }
          })
        //   .then(data => {
        //     if (!data) {
        //       console.log(`problem with network request: ${networkErrMsg}`)
        //     } else {
            
        //         console.log(data)
        //         setEdit(false)
              //   setServiceDetail()
                
  
              // call to refresh the list
              // set RefreshCounter(refreshCounter + 1)
        //     }
        //   })
  
      navigate('/dashboard')
      window.location.reload(false)

      
    }
    console.log(serviceDetail)
    console.log(dates)
  return (
      <div className='edit-service'> 
          <div className='close-icon' onClick={e => setEdit(false)}>ⓧ</div>
          {/* <h2>Edit Your Service</h2> */}
          {(serviceDetail.service === "housesitting") && <h2>House Sitting</h2>}
          {(serviceDetail.service === "boarding") && <h2>Boarding</h2>}
          {(serviceDetail.service === "dropin") && <h2>Drop-in Visits</h2>}
          <form onSubmit={handleSubmit}>
          <label htmlFor='displayName'>Display name </label>
            <input
              id="displayName"
              type="text"
              name="displayName"
            //   placeholder="Display Name as"
              required={false}
              value={serviceDetail.displayName}
              onChange = {handleChange}
            />
          <label htmlFor='headline'>Headline</label>
            <input
              id="headline"
              type="text"
              name="headline"
            //   placeholder="Your pets home away from home!"
            //   required={true}
              value={serviceDetail.headline}
              onChange = {handleChange}
          />
          <label htmlFor='rate'>Rate ($/each visit)</label>
            <input
              id="rate"
              type="number"
              name="rate"
            required={true}
            // placeholder="20"
              value={serviceDetail.rate}
              onChange = {handleChange}
          />
          
            <label htmlFor='note'>Special Note</label>
            <input
              id="note"
              type="text"
              name="note"
            //   placeholder=""
              required={false}
              value={serviceDetail.note}
              onChange = {handleChange}
              />

              <label>Dates not available</label>
              <DatePicker 
                      value={dates}
                      className='date'
                      onChange={setDates}
                      multiple
                      plugins={[
                        <DatePanel eachDaysInRange />
                      ]} />
              <div className='button-group'>
                  <input className="secondary-button" type="submit" value = "Update" />
                  <input className="secondary-button" onClick={handleDelete} type="submit" value = "Delete" />
              </div>
              </form>
          
    </div>
  )
}

export default EditService