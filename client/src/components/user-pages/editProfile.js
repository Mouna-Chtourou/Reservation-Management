import React, { useEffect, useState } from 'react'
import Layout from '../layout.js'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import { updateProfile } from '../../actions/userActions'
import { useHistory } from 'react-router-dom'
import { listOrganismes } from '../../actions/organismeActions.js'

function EditProfile() {
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')
  const [organisme, setOrganisme] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const organismeList = useSelector(state => state.organismeList)
  const { organismes } = organismeList

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading, error, success } = userUpdate

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    } else {
      setPrenom(userInfo.prenom)
      setNom(userInfo.nom)
      setEmail(userInfo.email)
      setTelephone(userInfo.telephone)
      setOrganisme(userInfo.organisme)
      dispatch(listOrganismes())
    }
  }, [dispatch, userInfo, history])

  const submitHandler = e => {
    e.preventDefault()
    if (password === passwordVerify) {
      dispatch(updateProfile({ prenom, nom, email, telephone, organisme, password }))
      history.push('/profil')
    }
  }

  return (
    <Layout>
      <div className='col-12 grid-margin stretch-card'>
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'> Modifier profil</h4>
            <form className='forms-sample' onSubmit={submitHandler}>
              <Form.Group>
                <label>Prénom </label>
                <Form.Control
                  type='text'
                  className='form-control'
                  value={prenom}
                  onChange={e => setPrenom(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <label>Nom </label>
                <Form.Control
                  type='text'
                  className='form-control'
                  value={nom}
                  onChange={e => setNom(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <label>E-mail</label>
                <Form.Control
                  type='email'
                  className='form-control'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <label>Numéro de Télephone </label>
                <Form.Control
                  type='text'
                  className='form-control'
                  value={telephone}
                  onChange={e => setTelephone(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <label>Organisme </label>
                <select
                  className='form-control form-control-lg'
                  name='organisme'
                  onChange={e => setOrganisme(e.target.value)}
                  value={organisme._id}
                >
                  {organismes && organismes.length
                    ? organismes.map((org, index) => (
                        <option value={org._id} key={index}>
                          {org.nom}
                        </option>
                      ))
                    : null}
                </select>
              </Form.Group>
              <Form.Group>
                <label>Mot de passe</label>
                <Form.Control
                  type='password'
                  className='form-control'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <label>Confirmer Mot de passe</label>
                <Form.Control
                  type='password'
                  className='form-control'
                  value={passwordVerify}
                  onChange={e => setPasswordVerify(e.target.value)}
                />
              </Form.Group>
              <div className='text-right'>
                <button type='submit' className='btn btn-primary '>
                  Confirmer
                </button>
                <button
                  type='reset'
                  className='btn btn-light'
                  onClick={() => history.push('/profil')}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EditProfile
