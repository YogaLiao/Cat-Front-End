import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { AiOutlineCalendar } from 'react-icons/ai'
import DatePicker, { DateObject, getAllDatesInRange } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"


function SearchForm({ setUserSearch }) {
    let navigate = useNavigate()
    const [service, setService] = useState("boarding")
    const [zipcode, setZipcode] = useState("75206")
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  
    // const [dates, setDates] = useState([])
    // const [allDates, setAllDates] = useState([])

    const handleClick = () => {
        setUserSearch(false)
    }
    const handleCheck = (e) => {
        setService(e.target.value)
        console.log(service)
        
    }
    const handleSubmit = (e) => {
        e.preventDefault()
      console.log(`${service} ${zipcode}`)
      console.log(format(date[0].startDate, "MM-dd-yyyy"))
      localStorage.setItem('service', service)
      localStorage.setItem('zipcode', zipcode)
      localStorage.setItem('start_date', date[0].startDate)
      localStorage.setItem('end_date', date[0].endDate)
        //add api here
        //navigate here
    }
    
  return (
    <div className = "search-form">
      <div className='close-icon' onClick={handleClick}>ⓧ</div>
      <h2>Find the Perfect Match</h2>
      <form onSubmit = {handleSubmit}>
      <label className = "search-title">What service do you need?</label>
            <div className='multiple-input-container'>
            <input
              id="boarding"
              type="radio"
              name="service"
              value="boarding"
                      onChange={handleCheck}
                      checked = {service === "boarding"}
              />
              <label htmlFor='boarding'>Boarding</label>
              <input
              id="housesitting"
              type="radio"
              name="service"
                      value="housesitting"
                      onChange={handleCheck}
                checked={service === "housesitting"}
              />
              <label htmlFor='housesitting'>House Setting</label>
              <input
              id="dropin"
              type="radio"
              name="service"
                      value="dropin"
                      onChange={handleCheck}
                checked={service === "dropin"}
              />
              <label htmlFor='dropin'>Drop-In Visits</label>
                </div>
        <label className = "search-title">What's your zipcode?</label>
              <input
          type="text"
          id="zipcode"
          name="zipcode"
          placeholder="zipcode"
          required={true}
          onChange={e => setZipcode(e.target.value)}
        />
              <label className="search-title">Which dates do you need?</label>

              {/* <span onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"><AiOutlineCalendar /> Add Dates:</span> */}
           
          {/* <DatePicker
            range
            calendarPosition="top-left"
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
          
                {/* {dates.length > 1 &&
                  <div>
                    <h5>
                      All Dates between {dates[0].format()} and {dates[1].format()}:
                    </h5>
                    <ul>
                      {allDates.map((date, index) => <li key={index}>{date.format()}</li>)}
                    </ul>
                  </div>
                } */}
              <span onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"><AiOutlineCalendar /> Add Dates: {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}</span>
              {openDate && (
                  <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className="date"
                      minDate={new Date()}
          />)}
        
        <input className = "secondary-button" type="submit" />
      </form>
    </div>
  )
}

export default SearchForm