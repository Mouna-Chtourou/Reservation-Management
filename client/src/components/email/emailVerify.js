import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Error404 from '../error-pages/Error404'
import Success from '../../assets/images/success.png'
import '../css.css'
import '../auth-pages/msg.css'
function EmailVerify() {
  const [validUrl, setValidUrl] = useState(true)
  const param = useParams()

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `/users/${param.id}/verify/${param.token}`
        const { data } = await axios.get(url)
        setValidUrl(true)
      } catch (error) {
        setValidUrl(false)
      }
    }
    verifyEmailUrl()
  }, [param])

  return (
    <React.Fragment>
      {validUrl ? (
        <div className='container'>
          <img src={Success} alt='success_img' className='success_img' />
          <h1>Email vérifié avec succès</h1>
          <Link to='/'>
            <button className='green_btn'>Login</button>
          </Link>
        </div>
      ) : (
        <Error404 />
      )}
    </React.Fragment>
  )
}
export default EmailVerify
