import React, { useState, useMemo } from "react";
import "@progress/kendo-theme-default/dist/all.css"; 
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import { DropDownList } from "@progress/kendo-react-dropdowns";

function ServicePanel() {
  const serviceInfo = [{
    username: 'admin', displayName: 'admin', headline: 'Your pets are mine', service: 'housesitting', rate: 20,
    service: "housesitting", note:'No', disable: ['2022/07/13', '2022/07/14', '2022/07/15', '2022/07/19', '2022/07/18']
  },
  {
    username: 'admin', displayName: 'admin', headline: 'Your pets are mine', service: 'boarding', rate: 30,
    service: "onboarding", note:'No', disable: ['2022/07/18', '2022/07/19', '2022/07/20', '2022/07/22']
  }]
  const [type, setType] = useState(serviceInfo[0].service)
  const types = []
  serviceInfo.map(x => types.push(x.service))
  const filteredData = useMemo(()=> serviceInfo.filter(x => x.service == type))
  const disable = filteredData[0].disable // insert db data here
  const disabledDays = []
  disable.map(day => {
    const d = new Date(day)
    disabledDays.push({
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    })
  })
  const defaultValue = utils().getToday()
  
  console.log(defaultValue)


  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [selected, setSelected] = useState(false)

  console.log(selected)
  console.log(selectedDay)

  const handleDisabledSelect = disabledDay => {
    console.log('Tried selecting a disabled day', disabledDay);
  };

  return (
    <div className="service">
      <div className="service-list">
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
      <h1>Availability</h1>
      <form>
        <DropDownList className="k-form k-mb-4" data={types} onChange={e => setType(e.value)} />
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
  
  )
}

export default ServicePanel