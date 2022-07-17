import React, {useState, useEffect} from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Calendar, utils } from "react-modern-calendar-datepicker";
import Booking from '../components/Booking';

function ServiceDetail({ accessToken, userSignedIn, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
userSignedIn = localStorage.getItem('user')
  let navigate = useNavigate()
  console.log(userSignedIn)
    const userEndpoint = 'services/4'
    const [serviceInfo, setserviceInfo] = useState()
    const [disabledDays, setDisabledDays] = useState([])
    const [openBook, setOpenBook] = useState(false)
    const defaultValue = utils().getToday()
  
    console.log(defaultValue)


    const [selectedDay, setSelectedDay] = useState(defaultValue);
    const [selected, setSelected] = useState(false)

    const handleDisabledSelect = disabledDay => {
        console.log('Tried selecting a disabled day', disabledDay);
      }


    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + userEndpoint)
          .then(data => {
            setserviceInfo(data.data)
              console.log(data.data)
              const disable = data.data.disable
              let copy = []
        disable.map(day => {
      const d = new Date(day)
      copy.push({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
      })
    })
    setDisabledDays(copy)
          })
    }, [])
    
  return (
      <>
          {!serviceInfo
              ? "Loading"
              : <div className='detail'>
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
                  <img src={serviceInfo.url}></img>
                </div>
                <div className='info'>
                  <p className="name">{serviceInfo.first_name} {serviceInfo.last_name}</p>
                    <p>{serviceInfo.city}, {serviceInfo.state}</p>
                    <button onClick={e => setOpenBook(true)} className='primary-button'>Book Now</button>
                </div>
              </div>
                
            </div>
          </section>
          <section className='bottom-container'>
                <div className="servicePanel">
                < div className="service-list">
          <h1>Service</h1>
            <div className="list">
              <div className="left">
              {(serviceInfo.service === "housesitting") && <h3>House Sitting</h3>}
            {(serviceInfo.service === "boarding") && <h3>Boarding</h3>}
            {(serviceInfo.service === "dropin") && <h3>Drop-in Visits</h3>}
              </div>
              <div className="right">
                <h3>$ {serviceInfo.rate}</h3>
                <p>per visit</p>
              </div>
            </div>
        </div>
            <h1>Availability</h1>
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
            </div>
            <div className="review">
                              <h1>About {serviceInfo.first_name} {serviceInfo.last_name}</h1>
                              <h2>{serviceInfo.about}</h2>
                              <h1>Contact {serviceInfo.first_name} {serviceInfo.last_name}</h1>
                              <h2>Call: {serviceInfo.cell}</h2>

                <h1>Reviews</h1>
                <h1>Coming Soon!</h1>
            </div>
                      </section>
                      </div>
                  {openBook && <Booking
                      setOpenBook = {setOpenBook}
                      accessToken={accessToken}
                      serviceInfo={serviceInfo}
                      disabledDays={disabledDays}
                  />}
              </div>
          }

      </>
  )
}

export default ServiceDetail