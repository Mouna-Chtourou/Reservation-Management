import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css.css'
import { Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'
import { listOrganismeRegister } from '../../actions/organismeActions.js'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import { isEmpty, isEmail, isLength, isMatch, isTelephone } from '../utils/validation'

const initialState = {
  prenom: '',
  nom: '',
  email: '',
  organisme: '',
  telephone: '',
  password: '',
  passwordVerify: '',
  err: '',
  success: '',
}
function Register({ history }) {
  const dispatch = useDispatch()

  const [user, setUser] = useState(initialState)
  const { prenom, nom, email, organisme, telephone, password, passwordVerify, err, success } = user

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, err: '', success: '' })
  }

  const organismeRegister = useSelector(state => state.organismeRegister)
  const { organismeReg } = organismeRegister

  const userRegister = useSelector(state => state.userRegister)
  const { data, error, succes } = userRegister

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/dashboard')
    }
    dispatch(listOrganismeRegister())
  }, [dispatch, history, userInfo])

  async function signup(event) {
    event.preventDefault()

    if (
      isEmpty(prenom) ||
      isEmpty(nom) ||
      isEmpty(email) ||
      isEmpty(organisme) ||
      isEmpty(password) ||
      isEmpty(telephone)
    )
      return setUser({
        ...user,
        err: ' Merci de remplir tous les champs.',
        success: '',
      })
    if (!isEmail(email)) return setUser({ ...user, err: 'Email invalide.', success: '' })
    if (isLength(password))
      return setUser({
        ...user,
        err: 'Mot de passe doit avoir au moins 6 caractères.',
        success: '',
      })
    if (!isTelephone(telephone))
      return setUser({
        ...user,
        err: 'Numéro de télephone doit avoir 8 chiffres.',
        success: '',
      })
    if (!isMatch(password, passwordVerify))
      return setUser({
        ...user,
        err: 'Mot de passes ne correspondent pas.',
        success: '',
      })

    try {
      const res = dispatch(
        register(nom, prenom, email, organisme, telephone, password, passwordVerify)
      )

      setUser({ ...user, err: '', success: succes })
    } catch (err) {
      setUser({ ...user, err: error, success: '' })
    }
  }
  const [passwordShown, setPasswordShown] = useState('password')
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  return (
    <div className='d-flex align-items-center auth px-0 lock-full-bg  '>
      <div className='row w-100 mx-0 '>
        <div className='col-lg-5 mx-auto '>
          <div className='auth-register-light text-left py-5 px-4 px-sm-5 '>
            <div className='brand-logo'>
              <img className='pos' src={require('../../assets/images/startup.png')} alt='logo' />
            </div>
            <h4>Nouveau ici?</h4>
            <h6 className='font-weight-light'>
              L'inscription est facile. Cela ne prend que quelques étapes
            </h6>
            {error && showErrMsg(error)}
            {err && showErrMsg(err)}
            {succes && showSuccessMsg(succes)}
            <form className='pt-3 ' onSubmit={signup}>
              <div className='form-row '>
                <div className='col'>
                  <div className='form-group d-flex search-field '>
                    <Form.Control
                      type='text'
                      className='form-control form-control-lg h-auto '
                      placeholder='Prénom'
                      name='prenom'
                      onChange={handleChangeInput}
                      value={prenom}
                    />
                    <span className='required ml-1'>*</span>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-group d-flex search-field '>
                    <input
                      type='text'
                      className='form-control form-control-lg '
                      placeholder='Nom'
                      name='nom'
                      onChange={handleChangeInput}
                      value={nom}
                    />
                    <span className='required ml-1'>*</span>
                  </div>
                </div>
              </div>
              <div className='form-row'>
                <div className='col'>
                  <div className='form-group d-flex search-field '>
                    <select
                      className='form-control form-control-lg'
                      name='organisme'
                      onChange={handleChangeInput}
                      value={organisme}
                    >
                      <option value=''>--Choisir Organisme--</option>
                      {organismeReg && organismeReg.length
                        ? organismeReg.map((org, index) => (
                            <option value={org._id} key={index}>
                              {org.nom}
                            </option>
                          ))
                        : null}
                    </select>
                    <span className='required ml-1'>*</span>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-group d-flex search-field'>
                    <input
                      type='text'
                      className='form-control form-control-lg'
                      placeholder='Télephone'
                      name='telephone'
                      onChange={handleChangeInput}
                      value={telephone}
                    />
                    <span className='required ml-1'>*</span>
                  </div>
                </div>
              </div>
              <div className='form-group d-flex search-field'>
                <input
                  type='text'
                  className='form-control form-control-lg'
                  placeholder='Email'
                  name='email'
                  onChange={handleChangeInput}
                  value={email}
                />
                <span className='required ml-1'>*</span>
              </div>
              <div className='form-row'>
                <div className='col'>
                  <div className='form-group  d-flex search-field'>
                    <Form.Control
                      type={passwordShown ? 'password' : 'text'}
                      className='form-control form-control-lg'
                      placeholder='Mot de passe'
                      className='h-auto'
                      name='password'
                      onChange={handleChangeInput}
                      value={password}
                    />
                    <span className='required ml-1'>*</span>
                    <button className='showpass' onClick={togglePassword}>
                      {passwordShown === false ? (
                        <i className='mdi mdi-eye'></i>
                      ) : (
                        <i className='mdi mdi-eye-off'></i>
                      )}
                    </button>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-group d-flex search-field '>
                    <Form.Control
                      className='form-control form-control-lg h-auto'
                      placeholder='Vérifier mot de passe'
                      name='passwordVerify'
                      type={passwordShown ? 'password' : 'text'}
                      onChange={handleChangeInput}
                      value={passwordVerify}
                    />
                    <span className='required ml-1'>*</span>
                    <button className='showpass' onClick={togglePassword}>
                      {passwordShown === false ? (
                        <i className='mdi mdi-eye'></i>
                      ) : (
                        <i className='mdi mdi-eye-off'></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <p aria-hidden='true' id='required-description'>
                <span class='required ml-2'>*</span> Champ obligatoire
              </p>
              <div className='mt-3 text-center'>
                <button type='submit' className='btn btn-lg font-weight-medium auth-form-btn'>
                  S'inscrire
                </button>
              </div>
              <div className='text-center mt-4 font-weight-light'>
                Vous avez déja un compte?{' '}
                <Link to='/' className='text-primary'>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register
