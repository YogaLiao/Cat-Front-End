import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";

function Review({ userSignedIn, id, accessToken }) {
    userSignedIn = localStorage.getItem('user')
    const [postReview, setPostReview] = useState(false)
    const userEndpoint = `services/${id}`
    const endpoint = 'reviews/'
    const [reviewInfo, setReviewInfo] = useState([])
    const [formData, setFormData] = useState({
        written_by: userSignedIn,
        written_to: id,
        date: new Date().toDateString(),
        content: "",
        rating: 5
    })
    const [networkErrMsg, setNetworkErrMsg] = useState(null)
    const [clientErrMsg, setClientErrMsg] = useState(null)

    const statusCodeToErr = (responseObj) => {
      setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
      // TODO - console log the err message
  }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + userEndpoint)
            .then(data => {
                setReviewInfo(data.data.reviews)
        })
    }, [])
    
    const handleChange = (e) => {
        console.log('e', e)
        setFormData({...formData, content: e.target.value})
    }

    const ratingChanged = (newRating) => {
        console.log(newRating)
        setFormData({...formData, rating: newRating})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const apiUrl = process.env.REACT_APP_API_URL
        console.log(`fetching with token ${accessToken}`)
        fetch(apiUrl + endpoint,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${accessToken}`
              },
              body: JSON.stringify(formData)
            }
          )
            .then(res => {
              if (res.ok) {
                return res.json()
              } else {
                statusCodeToErr(res)
                return Promise.resolve(null)
              }
            })
            .then(data => {
              if (!data) {
                console.log(`problem with network request: ${networkErrMsg}`)
              } else {
              
                  console.log(data)
                  setPostReview(true)
                  window.location.reload(false)
    
                // call to refresh the list
                // set RefreshCounter(refreshCounter + 1)
              }
            })

    }

    console.log(formData)
    return (
        <>
            {reviewInfo.length === 0
                ? <p>No Review Yet. Add the first review below!</p>
                :
                <div className='reviews'>
                    
                </div>}
            {!postReview && <div className='review-box'>
                <form onSubmit={handleSubmit}>
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#9b5de5"
                />,
                    <input type="text"
                        placeholder='Write your review here'
                        required={true}
                        name='content'
                        id='content'
                        className='review-text'
                        onChange={handleChange}
                        value={formData.content}/>
                    <input type = 'submit' className='secondary-button'/>
            </form>
            
            </div>}
    </>
  )
}

export default Review