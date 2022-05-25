import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css.css'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import { isEmpty, isLength, isMatch } from '../utils/validation'

const initialState = {
  password: '',
  passwordVerify: '',
  err: '',
  suc: '',
}

function Signup() {
  const { id } = useParams()

  const [user, setUser] = useState(initialState)
  const { password, passwordVerify, err, suc } = user

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, err: '', suc: '' })
  }

  const history = useHistory()

  const submitHandler = async () => {
    if (isEmpty(password) || isEmpty(passwordVerify))
      return setUser({ ...user, err: ' Merci de remplir tous les champs.', suc: '' })
    if (isLength(password))
      return setUser({ ...user, err: 'Mot de passe doit avoir au moins 6 caractères.', suc: '' })
    if (!isMatch(password, passwordVerify))
      return setUser({ ...user, err: 'Mot de passes ne correspondent pas.', suc: '' })

    try {
      const res = axios.post(`/employes/inscription/${id}`, { password, passwordVerify })
      history.push('/')

      setUser({ ...user, err: '', suc: res.data })
    } catch (err) {
      err.response.data.message && setUser({ ...user, err: err.response.data.message, suc: '' })
    }
  }
  useEffect(() => {}, [history])
  return (
    <div className='d-flex align-items-center auth px-0 lock-full-bg  '>
      <div className='row w-100 mx-0 '>
        <div className='col-lg-5 mx-auto '>
          <div className='sign-forgot-light text-left py-5 px-4 px-sm-5 '>
            <div className='brand-logo'>
              <img className='pos' src={require('../../assets/images/startup.png')} alt='logo' />
            </div>
            <h4>Nouveau ici?</h4>
            <h6 className='font-weight-light'>Veuillez terminer les étapes de l'inscription.</h6>
            {/* {error && showErrMsg(error)} */}
            {err && showErrMsg(err)}
            {suc && showSuccessMsg(suc)}
            <form className='pt-3 ' onSubmit={submitHandler}>
              <div className='col'>
                <div className='form-group  d-flex search-field'>
                  <Form.Control
                    type='password'
                    className='form-control form-control-lg'
                    placeholder='Mot de passe'
                    className='h-auto'
                    name='password'
                    onChange={handleChangeInput}
                    value={password}
                  />
                </div>
              </div>
              <div className='col'>
                <div className='form-group d-flex search-field '>
                  <Form.Control
                    type='password'
                    className='form-control form-control-lg'
                    placeholder='Vérifier mot de passe'
                    className='h-auto'
                    name='passwordVerify'
                    onChange={handleChangeInput}
                    value={passwordVerify}
                  />
                </div>
              </div>
              <div className='mt-3 text-center'>
                <button type='submit' className='btn btn-lg font-weight-medium auth-form-btn'>
                  Vers Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Signup
