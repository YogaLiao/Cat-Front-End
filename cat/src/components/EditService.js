import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import {useNavigate} from "react-router-dom"

function EditService({ id, setEdit, accessToken, userSignedIn }) {
    const navigate = useNavigate()
    console.log({ id })
    console.log(localStorage)
    const endpoint = `services/${id}`
    console.log(endpoint)
  const [networkErrMsg, setNetworkErrMsg] = useState(null)
  const format = "YYYY/MM/DD"

  const statusCodeToErr = (responseObj) => {
      setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
      // TODO - console log the err message
  }
    const [serviceDetail, setServiceDetail] = useState()

  const [date, setDate] = useState([])

    const getData = () => {
        axios.get(process.env.REACT_APP_API_URL + endpoint)
        .then(data => {
            setServiceDetail(data.data)
            let copy = []
            data.data.disable.map(x => copy.push(new Date(x)))
          setDate(copy)
          console.log(copy)
          setDates(copy)
        })
    }
    useEffect(() => {getData()
    // eslint-disable-next-line
    }, [])
  console.log(date)
  const [dates, setDates] = useState(date)
  console.log(dates)
    
    const handleChange = (e) => {
        setServiceDetail(((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
          })))
    }
  
  const handleDates = (e) => {
    let copy = []
    e.map(x => copy.push(x.format()))
    console.log(copy)
    setServiceDetail({ ...serviceDetail, disable: copy })
  }
    const handleSubmit = (e) => {
        e.preventDefault()
        setNetworkErrMsg(null)
        console.log(dates)
          console.log("submitted")
      console.log(serviceDetail)
      // console.log((dates[0].getDay()))
          // console.log(dates[0].format())
          // console.log(dates[1].format())
      // let dateCopy = []
      // eslint-disable-next-line
          // dates.map(date => {
            // let d = new Date(date)
            // console.log(d)
            // let copy = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
      //       let copy = date.format()
      //       dateCopy.push(copy)
      //     })
      // console.log(dateCopy)
      // console.log(typeof (dateCopy[0]))
      // console.log(serviceDetail.disable)
      //     setServiceDetail({ ...serviceDetail, disable: dateCopy })
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
                  
                navigate('/dashboard')
                window.location.reload(false)
                // call to refresh the list
                // set RefreshCounter(refreshCounter + 1)
              }
            })
    
        

        
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
  // console.log(Date(dates[0]))
  // console.log(typeof(dates[0])) 
  return (
    <>
      {!serviceDetail
        ? "Loading"
        :
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
              onChange={handleChange}
            />
            <label htmlFor='headline'>Headline</label>
            <input
              id="headline"
              type="text"
              name="headline"
              //   placeholder="Your pets home away from home!"
              //   required={true}
              value={serviceDetail.headline}
              onChange={handleChange}
            />
            <label htmlFor='rate'>Rate ($/each visit)</label>
            <input
              id="rate"
              type="number"
              name="rate"
              required={true}
              // placeholder="20"
              value={serviceDetail.rate}
              onChange={handleChange}
            />
          
            <label htmlFor='note'>Special Note</label>
            <input
              id="note"
              type="text"
              name="note"
              //   placeholder=""
              required={false}
              value={serviceDetail.note}
              onChange={handleChange}
            />

            <label>Dates not available</label>
            {/* <DatePicker 
                      value={dates}
                      className='date'
                      
                      onChange={setDates}
                      multiple
                      plugins={[
                        <DatePanel eachDaysInRange />
          ]} /> */}
            <DatePicker
              // render={<Icon/>}
              multiple
              className='date'
              value={dates}
              // selected={dates}
              format = {format}
              onChange={handleDates}
                    
              // dateFormat="Pp"
              plugins={[
                <DatePanel eachDaysInRange />
              ]}
            />
            <div className='button-group'>
              <input className="secondary-button" type="submit" value="Update" />
              <input className="secondary-button" onClick={handleDelete} type="submit" value="Delete" />
            </div>
          </form>
          
        </div>}
      </>
  )
}

export default EditService