import React, { useState } from 'react'
import Spinner from '../shared/Spinner'
import axios from 'axios'
import { isEmail, isEmpty } from '../utils/validation'
import { showErrMsg, showSuccessMsg } from '../utils/notifications'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import '../css.css'

const initialState = {
  email: '',
  err: '',
  suc: '',
}

function ForgotPassword() {
  const [data, setData] = useState(initialState)

  const { email, err, suc } = data

  const handleChangeInput = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value, err: '', suc: '' })
  }

  const forgotPassword = async event => {
    event.preventDefault()
    if (isEmpty(email))
      return setData({
        ...data,
        err: ' Merci de remplir champs email.',
        suc: '',
      })
    if (!isEmail(email)) return setData({ ...data, err: 'email invalide.', suc: '' })

    try {
      const res = await axios.post('/users/forgotpassword', { email })

      return setData({ ...data, err: '', suc: res.data.message })
    } catch (err) {
      err.response.data.message && setData({ ...data, err: err.response.data.message, suc: '' })
    }
  }

  return (
    <div className='d-flex align-items-center auth px-0 lock-full-bg  '>
      <div className='row w-100 mx-0 '>
        <div className='col-lg-4 mx-auto '>
          <div className='auth-forgot-light text-left py-5 px-4 px-sm-5 '>
            <div className='brand-logo'>
              <img className='pos' src={require('../../assets/images/startup.png')} alt='logo' />
            </div>
            <h6 className='font-weight-light'>Mot de passe oubié</h6>
            {err && showErrMsg(err)}
            {suc && showSuccessMsg(suc)}
            <Form className='pt-3'>
              <Form.Group className='d-flex search-field'>
                <Form.Control
                  type='email'
                  name='email'
                  placeholder='Email'
                  size='lg'
                  className='h-auto'
                  onChange={handleChangeInput}
                  value={email}
                />
              </Form.Group>

              <div className='mt-3 text-center'>
                <button
                  onClick={forgotPassword}
                  type='submit'
                  className='btn btn-lg font-weight-medium auth-form-btn'
                >
                  Envoyer
                </button>
              </div>
              <div className='my-3 d-flex justify-content-between align-items-center'>
                <Link to='/' className='text-light'>
                  <i className='mdi mdi-arrow-left mr-2'></i>
                  Retour vers Login
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
