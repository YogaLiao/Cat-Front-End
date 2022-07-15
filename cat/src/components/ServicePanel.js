import React, { useState, useEffect, useMemo } from "react";
import "@progress/kendo-theme-default/dist/all.css"; 
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import axios from 'axios'

function ServicePanel({userSignedIn}) {

  userSignedIn = localStorage.getItem('user')
  console.log(userSignedIn)
  const userEndpoint = 'users'
  const [serviceInfo, setServiceInfo] = useState([])
  const [types, setTypes] = useState([])

  const [type, setType] = useState("")
  const [disabledDays, setDisabledDays] = useState([])

  // const serviceInfo =
  //   [{
  //   username: 'admin', displayName: 'admin', headline: 'Your pets are mine', service: 'housesitting', rate: 20,
  //   service: "housesitting", note:'No', disable: ['2022/07/13', '2022/07/14', '2022/07/15', '2022/07/19', '2022/07/18']
  // },
  // {
  //   username: 'admin', displayName: 'admin', headline: 'Your pets are mine', service: 'boarding', rate: 30,
  //   service: "onboarding", note:'No', disable: ['2022/07/18', '2022/07/19', '2022/07/20', '2022/07/22']
  //   }]
    useEffect(() => {
      axios.get(process.env.REACT_APP_API_URL + userEndpoint)
        .then(data => {
          console.log(data.data)
          let info = data.data.filter(x => x.username == userSignedIn)
          console.log(info)
          console.log(data.data[0].username)
          setServiceInfo(info[0].services)
          // setType(serviceInfo.service)
          // const filteredData = serviceInfo.filter(x => x.service == type)
          // setDisable(filteredData.disable )
          let copy = []
          serviceInfo.map(x => copy.push(x.service))
          setTypes(copy)
          setType(serviceInfo[0].service)
          const disable = serviceInfo[0].disable
          let copy1 = []
          disable.map(day => {
            const d = new Date(day)
            copy1.push({
              year: d.getFullYear(),
              month: d.getMonth() + 1,
              day: d.getDate()
            })
          })
          setDisabledDays(copy1)
        })
      
          
        
    }, [])
  

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
 
  console.log(serviceInfo)
  console.log(types)
  
    
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
  


  return (
    <>
      {!serviceInfo
        ? "Loading"
        : <div className="service">
      
          {serviceInfo.length > 0
          ? < div className="service-list">
          <h1>Services</h1>
          
        
          {serviceInfo.map(x => (
            <div className="list">
              <div className="left">
                <h3>{x.service}</h3>
              </div>
              <div className="right">
                <h3>$ {x.rate}</h3>
                <p>per visit</p>
              </div>
            </div>
          ))}
        
        
            </div>
        : <h1>No Service Yet</h1>}
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
        </div>
      }
      </>
  
  )
}

export default ServicePanel