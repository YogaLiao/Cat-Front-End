import React, {useState, useEffect} from 'react'
import Nav from '../components/Nav'
import Filter from '../components/Filter'
import axios from 'axios'
import { DateRange } from "react-date-range";
import {useNavigate} from "react-router-dom"

function Result({ accessToken, userSignedIn, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
    userSignedIn = localStorage.getItem('user')
    const navigate = useNavigate()
    console.log(localStorage)
    const [service, setService] = useState(localStorage.getItem('service'))
    const [serviceInfo, setServiceInfo] = useState([])
    const [zipcode, setZipcode] = useState(localStorage.getItem('zipcode'))
    const start_date = localStorage.getItem('start_date')
    const end_date = localStorage.getItem('end_date')

    const [rate, setRate] = useState(0)
    const endpoint = `search/services/?service=${service}`

    // const compareDates = (arr) => {
    //     if (arr.map(x => {
    //         new Date(x).valueOf() <= new Date(end_date).valueOf() && new Date(x).valueOf() >=new Date(start_date).valueOf() 
    //     })) {
    //         return false
    //     }
    //     else {return true}
    // }
    console.log(new Date('2022/07/21').valueOf() >= new Date(start_date).valueOf())
    console.log(new Date('2022/07/21').valueOf())
    console.log(new Date(start_date).valueOf())
    // console.log(compareDates(['2022/07/14', '2022/07/18', '2022/07/19', '2022/07/21']))
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + endpoint)
            .then(data => {
                let info = data.data.filter(x => {
                    return (x.username != userSignedIn && x.zipcode.slice(0,3) == zipcode.slice(0,3))
                })
                setServiceInfo(info)
            })
    }, [])

    console.log(serviceInfo)
    console.log(localStorage.getItem('start_date'))
    const start = localStorage.getItem('start_date')
    const dates = DateRange[localStorage.getItem('start_date'), localStorage.getItem('end_date')]
    console.log(dates)

  return (
      <div className='results'>
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
            <div className='left-container'>
                  <Filter />
              </div>
              <div className='right-container'>
                  <h1>Search Results:</h1>
              </div> 
          </div>
    </div>
  )
}

export default Result