import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Calendar, utils } from "react-modern-calendar-datepicker";
import {useNavigate} from "react-router-dom"


function Booking({ setOpenBook, accessToken, serviceInfo, disabledDays }) {
    let navigate = useNavigate()
  console.log(serviceInfo)
  const endpoint = `services/${serviceInfo.id}`
    const defaultValue = utils().getToday()
    console.log(defaultValue)

    const [serviceDetail, setServiceDetail] = useState(serviceInfo)
    const [selectedDay, setSelectedDay] = useState(defaultValue);
    const [selected, setSelected] = useState(false)
    const [networkErrMsg, setNetworkErrMsg] = useState(null)

  const statusCodeToErr = (responseObj) => {
      setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
      // TODO - console log the err message
  }
    

    const handleDisabledSelect = disabledDay => {
        console.log('Tried selecting a disabled day', disabledDay);
    }
  
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + endpoint)
    .then(data=> setServiceDetail(data.data))
  }, [])
  
  const handleClick = () => {
    setOpenBook(false)
    window.location.reload(false)
  }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setNetworkErrMsg(null)
        console.log(serviceInfo)
        console.log(`${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`)
        let dataCopy = serviceDetail.disable
        dataCopy.push(`${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`)
        console.log(dataCopy)
        setServiceDetail({ ...serviceDetail, disable: dataCopy})
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
                  setOpenBook(false)
                //   setServiceDetail()
                  
    
                // call to refresh the list
                // set RefreshCounter(refreshCounter + 1)
              }
            })
    
        navigate(`/results/${serviceDetail.id}`)
        window.location.reload(false)


    }
    console.log(serviceDetail)
  return (
      <div className='booking'>
          <div className='close-icon' onClick={handleClick}>ⓧ</div>
          <h2>Booking Detail</h2>
          <h3>Booking with: {serviceDetail.first_name} {serviceDetail.last_name}</h3>
          <form onSubmit={handleSubmit}>
              <h3>Service Type:
              {(serviceDetail.service === "housesitting") && <span> House Sitting</span>}
          {(serviceDetail.service === "boarding") && <span> Boarding</span>}
          {(serviceDetail.service === "dropin") && <span> Drop-in Visits</span>}
              </h3>
              <h3>Select Date: </h3>
              <Calendar
            value={selectedDay}
            onChange={d => {
                setSelectedDay(d)
                setSelected(true)
            }}
            minimumDate={utils().getToday()}
            colorPrimary="#9b5de5"
            calendarTodayClassName="custom-today-day"
            calendarClassName="responsive-calendar"
            disabledDays={disabledDays} // here we pass them
            onDisabledDayError={handleDisabledSelect} // handle error
            shouldHighlightWeekends
            />  
              <h3>Price: ${serviceDetail.rate}</h3>
              <input className="secondary-button" type="submit" value = "Confirm Booking" />
          </form>



    </div>
  )
}

export default Booking