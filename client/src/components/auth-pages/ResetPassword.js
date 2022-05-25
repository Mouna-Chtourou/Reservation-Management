import React, { useState } from 'react'
import Spinner from '../shared/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { isLength, isMatch } from '../utils/validation'
import { showErrMsg, showSuccessMsg } from '../utils/notifications'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import '../css.css'

const initialState = {
  password: '',
  passwordVerify: '',
  err: '',
  suc: '',
}

function ResetPassword() {
  const [data, setData] = useState(initialState)
  const { id, token } = useParams()

  const { password, passwordVerify, err, suc } = data

  const handleChangeInput = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value, err: '', suc: '' })
  }

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const history = useHistory()
  const handleResetPass = async () => {
    if (isLength(password))
      return setData({ ...data, err: 'Mot de passe doit avoir au moins 6 caractères.', suc: '' })
    if (!isMatch(password, passwordVerify))
      return setData({ ...data, err: 'Mot de passes ne correspondent pas.', suc: '' })

    try {
      const res = await axios.post(`/users/resetpassword/${id}/${token}`, {
        password,
        passwordVerify,
      })
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
            <h6 className='font-weight-light'>Réinitialiser le mot de passe</h6>
            {err && showErrMsg(err)}
            {suc && showSuccessMsg(suc)}
            <Form className='pt-3' onSubmit={handleResetPass}>
              <Form.Group className='d-flex search-field'>
                <Form.Control
                  type='password'
                  name='password'
                  placeholder='******'
                  size='lg'
                  className='h-auto'
                  onChange={handleChangeInput}
                  value={password}
                />
              </Form.Group>
              <Form.Group className='d-flex search-field'>
                <Form.Control
                  type='password'
                  name='passwordVerify'
                  placeholder='******'
                  size='lg'
                  className='h-auto'
                  onChange={handleChangeInput}
                  value={passwordVerify}
                />
              </Form.Group>

              <div className='mt-3 text-center'>
                <button type='submit' className='btn btn-lg font-weight-medium auth-form-btn'>
                  Confirmer
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

export default ResetPassword
