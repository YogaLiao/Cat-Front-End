import React, { useState } from 'react'
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { AiOutlineCalendar } from 'react-icons/ai'
import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import InputRange from 'react-input-range';

function Filter() {

    const [service, setService] = useState(localStorage.service)
    const [zipcode, setZipcode] = useState(localStorage.zipcode)
    const [openDate, setOpenDate] = useState(false);
    const [value, setValue] = useState(50)
    

    const [dates, setDates] = useState([
      new Date(localStorage.start_date), new Date(localStorage.end_date)
    ]);

    const handleCheck = (e) => {
        setService(e.target.value)
        console.log(service)   
    }

  return (
      <div className='filter'>
          <div className="service">
              <form>
              <label className = "search-title">Service Type</label>
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
                  <label className = "search-title">Service Near</label>
              <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={zipcode}
        //   required={true}
          onChange={e => setZipcode(e.target.value)}
        />
                  <label className="search-title">Date Range</label>
                  {/* <span onClick={() => setOpenDate(!openDate)}
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
          />)} */}
                  <DatePicker 
                      value={dates}
                      className='date'
                      onChange={setDates}
                      range
                      plugins={[
                        <DatePanel eachDaysInRange />
                      ]} />
                  <label className="search-title">Rate Range: (<span>0 ~ ${value}</span>/per visit)</label>
                  {/* <output id="rangevalue" >{value}</output> */}
                  <input type="range" min="0" max="100" onChange={e => setValue(e.target.value)} />
                  
                  <input className = "secondary-button" type="submit" value = "Search Agin"/>
              </form>
          </div>
    </div>
  )
}

export default Filter