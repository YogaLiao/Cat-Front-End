import React from 'react'
import { AiFillInstagram} from 'react-icons/ai'
import {BsLinkedin, BsTwitter} from 'react-icons/bs'

function Footer() {
  return (
    <div className='footer'>
      <div className='text'>
      Copyright © 2022 Yujia Liao
      </div>
      <div className='icons'>
        <AiFillInstagram /> <BsLinkedin /> <BsTwitter />
        </div>
    </div>
  )
}

export default Footer