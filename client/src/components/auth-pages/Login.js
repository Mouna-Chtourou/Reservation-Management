import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import Spinner from '../shared/Spinner'
import '../css.css'
import { login } from '../../actions/userActions'
import { isEmpty, isEmail } from '../utils/validation'

const initialState = {
  email: '',
  password: '',
  err: '',
  suc: '',
}

function Login({ history }) {
  const dispatch = useDispatch()

  const [user, setUser] = useState(initialState)
  const { email, password, err, suc } = user

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, err: '', suc: '' })
  }

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.role === 'employe') {
      history.push('/reservations/reserver')
    }
    if (userInfo && userInfo.role === 'admin') {
      history.push('/dashboard')
    }
    if (userInfo && userInfo.role === 'representant') {
      history.push('/dashboard')
    }
  }, [history, userInfo])
  const onSubmit = async event => {
    event.preventDefault()
    if (isEmpty(email) || isEmpty(password))
      return setUser({
        ...user,
        err: ' Merci de remplir tous les champs.',
        suc: '',
      })

    if (!isEmail(email)) return setUser({ ...user, err: 'Email invalide.', suc: '' })

    try {
      const res = dispatch(login(email, password))
      setUser({ ...user, err: '', suc: res.data })
    } catch (err) {
      setUser({ ...user, err: err, suc: '' })
    }
  }

  const [passwordShown, setPasswordShown] = useState('password')
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  return (
    <div className='d-flex align-items-center auth px-0 lock-full-bg  '>
      <div className='row w-100 mx-0 '>
        <div className='col-lg-4 mx-auto '>
          <div className='auth-login-light text-left py-5 px-4 px-sm-5 '>
            <div className='brand-logo'>
              <img className='pos' src={require('../../assets/images/startup.png')} alt='logo' />
            </div>
            <h6 className='font-weight-light'>Connectez-vous pour continuer.</h6>
            {error && showErrMsg(error)}
            {err && showErrMsg(err)}
            {suc && showSuccessMsg(suc)}
            <Form className='mt-5' onSubmit={onSubmit}>
              <Form.Group className='d-flex search-field'>
                <Form.Control
                  type='email'
                  placeholder='Email'
                  size='lg'
                  name='email'
                  className='h-auto'
                  onChange={handleChangeInput}
                  value={email}
                />
              </Form.Group>
              <Form.Group className='d-flex search-field'>
                <Form.Control
                  id='password'
                  type={passwordShown ? 'password' : 'text'}
                  placeholder='Mot de passe'
                  size='lg'
                  name='password'
                  className='h-auto'
                  onChange={handleChangeInput}
                  value={password}
                />{' '}
                <button className='showpass' onClick={togglePassword}>
                  {passwordShown === false ? (
                    <i className='mdi mdi-eye'></i>
                  ) : (
                    <i className='mdi mdi-eye-off'></i>
                  )}
                </button>
              </Form.Group>

              <div className='mt-3 text-center'>
                <button type='submit' className='btn btn-lg font-weight-medium auth-form-btn'>
                  Connexion
                </button>
              </div>
              <div className='my-2 d-flex justify-content-between align-items-center'>
                <div className='form-check '>
                  <Link to='/forgetpassword' className='text-light'>
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>
              <div className='text-center mt-4 mb-5 font-weight-light'>
                Vous n'avez pas de compte ?{' '}
                <Link to='/register' className='text-primary'>
                  Créer
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
