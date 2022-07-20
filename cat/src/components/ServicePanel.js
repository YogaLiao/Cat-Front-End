import React, { useState, useEffect } from "react";
import "@progress/kendo-theme-default/dist/all.css"; 
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import axios from 'axios'
import EditService from "./EditService";

function ServicePanel({userSignedIn, accessToken}) {

  userSignedIn = localStorage.getItem('user')
  console.log(userSignedIn)
  const userEndpoint = `search/services/?`
  const typeEndpoint = `search/services/?service=`
  const [serviceInfo, setServiceInfo] = useState([])
  const [types, setTypes] = useState([])

  const [type, setType] = useState("")
  const [disabledDays, setDisabledDays] = useState([])

  useEffect(() => {
    const all = ['housesitting', 'boarding', 'dropin']
    const copy = []
    all.map(x => {
      axios.get(process.env.REACT_APP_API_URL + typeEndpoint + x)
        .then(data => {
          let info = data.data.filter(x=>x.username == userSignedIn)
          if (info.length > 0) {
          copy.push(x)
        }
        })
      setTypes(copy)
    })
    
    axios.get(process.env.REACT_APP_API_URL + userEndpoint)
      .then(data => {
          let info = data.data.filter(x=>x.username == userSignedIn)
          // console.log(data.data)
          setServiceInfo(info)
          console.log(serviceInfo)
          setDisabledDays(info[0].disable)
          setType(info[0].service)
          
          }
      )
  }
    , [])
  console.log(serviceInfo)
  console.log(types)
  // const serviceInfo =
  //   [{
  //   username: 'admin', displayName: 'admin', headline: 'Your pets are mine', service: 'housesitting', rate: 20,
  //   service: "housesitting", note:'No', disable: ['2022/07/13', '2022/07/14', '2022/07/15', '2022/07/19', '2022/07/18']
  // },
  // {
  //   username: 'admin', displayName: 'admin', headline: 'Your pets are mine', service: 'boarding', rate: 30,
  //   service: "onboarding", note:'No', disable: ['2022/07/18', '2022/07/19', '2022/07/20', '2022/07/22']
  //   }]
    // useEffect(() => {
    //   axios.get(process.env.REACT_APP_API_URL + userEndpoint)
    //     .then(data => {
    //       console.log(data.data)
    //       setServiceInfo(data.data)
    //       console.log(serviceInfo)
    //       setDisabledDays(data.data[0].disable)
    //       setType(data.data[0].service)
          
    //       }
    //   )}
    // , [])
  

    const handleChange = (e) => {
    setType(e.target.value)
    const filteredData = serviceInfo.filter(x => x.service == type)
    const disable = filteredData[0].disable
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
    }
 
  // console.log(serviceInfo)
  // console.log(types)
  
    
    // const filteredData = useMemo(() => serviceInfo.filter(x => x.service == type))
    // const disable = filteredData[0].disable
    // const disabledDays = []
    // disable.map(day => {
    //   const d = new Date(day)
    //   disabledDays.push({
    //     year: d.getFullYear(),
    //     month: d.getMonth() + 1,
    //     day: d.getDate()
    //   })
    // })
    const defaultValue = utils().getToday()
  
    console.log(defaultValue)


    const [selectedDay, setSelectedDay] = useState(defaultValue);
    const [selected, setSelected] = useState(false)

    console.log(selected)
    console.log(selectedDay)

    const handleDisabledSelect = disabledDay => {
      console.log('Tried selecting a disabled day', disabledDay);
    }
  
  const [edit, setEdit] = useState(false)
  const [serviceId, setServiceId] = useState()

  return (
    <>
      {!serviceInfo
        ? "Loading"
        : <div className="service">
      
          {serviceInfo.length > 0
          ? < div className="service-list">
          <h1>Services <a href="/add">+</a></h1>
          <form>
        
          {serviceInfo.map(x => (
            <div className="list" onClick={e => {
              setEdit(true)
              setServiceId(x.id)}}>
              <div className="left">
              {(x.service === "housesitting") && <h3>House Sitting</h3>}
            {(x.service === "boarding") && <h3>Boarding</h3>}
            {(x.service === "dropin") && <h3>Drop-in Visits</h3>}
                {/* <h3>{x.service}</h3> */}
              </div>
              <div className="right">
                <h3>$ {x.rate}</h3>
                <p>per visit</p>
              </div>
            </div>
          ))}
                
                </form>
        
        
            </div>
        : <h1>You do not have service yet. Become a pet sitter <a href = "/add">here!</a></h1>}
          <h1>Availability</h1>
          <form>
            <DropDownList className="k-form k-mb-4" data={types} onChange={handleChange} />
          </form>
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
          {edit &&
            <EditService
            id={serviceId}
            userSignedIn={userSignedIn}
            setEdit={setEdit}
            accessToken = {accessToken}
            />}
        </div>
      }
      </>
  
  )
}

export default ServicePanel