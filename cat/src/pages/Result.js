import React, {useState, useEffect} from 'react'
import Nav from '../components/Nav'
import Filter from '../components/Filter'
import axios from 'axios'
import { Link } from "react-router-dom"
import Footer from '../components/Footer';
import ReactStars from "react-rating-stars-component";

function Result({ accessToken, userSignedIn, setAccessToken, setUserSignedIn, setShowModal, showModal, setIsSignUp, isSignUp }) {
    userSignedIn = localStorage.getItem('user')
    console.log(localStorage)
    const service = localStorage.getItem('service')
    const [serviceInfo, setServiceInfo] = useState([])
    const zipcode = localStorage.getItem('zipcode')
    const rate = localStorage.getItem('rate') || 50
    const start_date = localStorage.getItem('start_date')
    const end_date = localStorage.getItem('end_date')

    // const [rate, setRate] = useState(0)
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
                    return (x.username !== userSignedIn && x.zipcode.slice(0,2) === zipcode.slice(0,2) && x.rate <= rate)
                })
                console.log(info)
                let result = []
            if (info.length > 0)
                {for (let i = 0; i < info.length; i++) {
                    let copy = info[i].disable.filter(x => {
                        return (new Date(x).valueOf() > new Date(end_date).valueOf() || new Date(x).valueOf() < new Date(start_date).valueOf())
                    })
                    console.log(copy)
                    if (copy.length === info[i].disable.length) {
                        result.push(info[i])
                    }
                }}
                
                setServiceInfo(result)
            })
        // eslint-disable-next-line
    }, [])

    console.log(serviceInfo)
    console.log(rate)

    return (
        <>
            {!serviceInfo
                ? "Loading"
                : <div className='results'>
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
                            {serviceInfo.length === 0
                                ? <h3>Sorry we currently do not have pet sitters that fits your needs. You can check later.</h3>
                                : <div className='result-list'>
                          
                                    {serviceInfo.map(x => (
                                        <Link to={`/results/${x.id}`}>
                                            <div className='card'>
                                                <img className="picture" src={x.url} alt='N/A'></img>
                                                <div className='card-detail'>
                                                    <h1>{x.first_name} {x.last_name}</h1>
                                                    {x.reviews.length > 0
                                                        ? <div className='result-star'>
                                                            <ReactStars
                                                                count={5}
                                                                value={Number(x.reviews.reduce((r, c) => r + c.rating, 0) / x.reviews.length)}
                                                                size={24}
                                                                isHalf={true}
                                                                emptyIcon={<i className="far fa-star"></i>}
                                                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                fullIcon={<i className="fa fa-star"></i>}
                                                                activeColor="#9b5de5"
                                                            />
                                                            <p>{Number(x.reviews.reduce((r, c) => r + c.rating, 0) / x.reviews.length).toFixed(1)}</p>
                                                        </div>
                                                    : null}
                                                    <p>{x.headline}</p>
                                                    <h3>{x.city}, {x.state} {x.zipcode}</h3>
                                                    <h3>${x.rate} per visit</h3>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                    <Footer />
                </div>}
            </>
  )
}

export default Result