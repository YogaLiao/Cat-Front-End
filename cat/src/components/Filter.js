import React, { useState } from 'react'
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { AiOutlineCalendar } from 'react-icons/ai'
import { useNavigate } from "react-router-dom"

function Filter() {
    let navigate = useNavigate()
    const [service, setService] = useState(localStorage.getItem('service'))
    const [zipcode, setZipcode] = useState(localStorage.getItem('zipcode'))
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
      {
        startDate: new Date(localStorage.getItem("start_date")),
        endDate: new Date(localStorage.getItem('end_date')),
        key: "selection",
      },
    ]);
    const [value, setValue] = useState(50)
    

    // const [dates, setDates] = useState([
    //   new Date(localStorage.start_date), new Date(localStorage.end_date)
    // ]);

    const handleCheck = (e) => {
        setService(e.target.value)
        console.log(service)   
    }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('service', service)
    localStorage.setItem('zipcode', zipcode)
    localStorage.setItem('rate', value)
      localStorage.setItem('start_date', date[0].startDate)
      localStorage.setItem('end_date', date[0].endDate)
    navigate('/results')
    window.location.reload(false)
  }

  return (
      <div className='filter'>
          <div className="service">
              <form onSubmit={handleSubmit}>
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
                  {/* <DatePicker 
                      value={dates}
                      className='date'
                      onChange={setDates}
                      range
                      plugins={[
                        <DatePanel eachDaysInRange />
                      ]} /> */}
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