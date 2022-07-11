import React, {useState} from 'react'
// import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Page, getJson, setOptions } from '@mobiscroll/react';

function AvaiCalendar(userSignedIn, setAccessToken, setUserSignedIn,setShowModal, showModal, setIsSignUp, isSignUp) {

const min = '2022-07-11';
const max = '2023-01-11';
const [singleLabels, setSingleLabels] = useState([]);
const [singleInvalid, setSingleInvalid] = useState([]);

const onPageLoadingSingle = React.useCallback((event, inst) => {
    getPrices(event.firstDay, (bookings) => {
        setSingleLabels(bookings.labels);
        setSingleInvalid(bookings.invalid);
      
    });
}, []);

function getAllDaysInMonth(year, month) {
  const date = new Date(year, month, 1);

  const dates = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
  
 
  
  const getPrices = (d, callback) => {
    let invalid = [];
    let labels = [];
    let now = new Date()
    let dates = getAllDaysInMonth(now.getFullYear(), now.getMonth())
    let bookings = ["2022-07-12", "2022-07-13"]
    bookings = bookings.map(booking => new Date(booking).getDate())
    console.log(bookings)
    for (let i = 0; i < dates.length; i++) {
      let date = new Date(dates[i])
      const d = date.getDate()

      console.log(d)
        if (bookings.includes(date.getDate())) {
          labels.push({
            start: date,
            title: '$20',
            textColor: '#e1528f'
          });
        } else {
          invalid.push(date);
        }
      
    }
    console.log(invalid)
    callback({ labels: labels, invalid: invalid });
  }


  const getBookings = (d, callback) => {
    let invalid = [];
    let labels = [];
  }
return (
    <Page className="md-calendar-booking">
        <div className="mbsc-form-group">
            <div className="mbsc-form-group-title">Single date & appointment booking</div>
            <Datepicker 
                display="inline"
                controls={['calendar']}
                min={min}
                max={max}
                labels={singleLabels}
                invalid={singleInvalid}
                onPageLoading={onPageLoadingSingle}
            />
        </div>
        
    </Page>
);
}

export default AvaiCalendar