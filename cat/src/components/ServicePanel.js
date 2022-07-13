import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";

function ServicePanel() {
  const disable = ['2022/07/11', '2022/07/12', '2022/07/14', '2022/07/21'] // insert db data here
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

  // const disabledDays = [
  //   {
  //     year: 2022,
  //     month: 7,
  //     day: 20,
  //   },
  //   {
  //     year: 2022,
  //     month: 7,
  //     day: 21,
  //   },
  //   {
  //     year: 2022,
  //     month: 7,
  //     day: 7,
  //   }
  // ];

  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [selected, setSelected] = useState(false)

  console.log(selected)
  console.log(selectedDay)

  const handleDisabledSelect = disabledDay => {
    console.log('Tried selecting a disabled day', disabledDay);
  };

  return (
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
  
  )
}

export default ServicePanel