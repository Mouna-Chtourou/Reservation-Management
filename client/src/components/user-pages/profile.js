import React, { useEffect } from 'react'
import Layout from '../layout.js'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import { listOrganismes } from '../../actions/organismeActions.js'
import { useHistory } from 'react-router-dom'

function Profile() {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdate = useSelector(state => state.userUpdate)
  const { success: successUpdate } = userUpdate

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const organismeList = useSelector(state => state.organismeList)
  const { organismes } = organismeList

  const history = useHistory()

  useEffect(() => {
    dispatch(listOrganismes())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, userInfo, history, successUpdate])
  const setPrenom = () => {
    if (userInfo) {
      return capitalizeFirstLetter(userInfo.prenom)
    }
  }
  const setNom = () => {
    if (userInfo) {
      return capitalizeFirstLetter(userInfo.nom)
    }
  }
  const setEmail = () => {
    if (userInfo) {
      return userInfo.email
    }
  }
  const setTelephone = () => {
    if (userInfo) {
      return userInfo.telephone
    }
  }
  const setOrganisme = () => {
    if (userInfo) {
      return userInfo.organisme.nom
    }
  }
  return (
    <Layout>
      <div className='col-12 grid-margin stretch-card'>
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'>Profil utilisateur</h4>
            <form className='forms-sample'>
              <Form.Group>
                <label>Prénom </label>
                <Form.Control type='text' className='form-control' value={setPrenom()} disabled />
              </Form.Group>
              <Form.Group>
                <label>Nom </label>
                <Form.Control type='text' className='form-control' value={setNom()} disabled />
              </Form.Group>
              <Form.Group>
                <label>E-mail</label>
                <Form.Control type='email' className='form-control' value={setEmail()} disabled />
              </Form.Group>
              <Form.Group>
                <label>Numéro de Télephone </label>
                <Form.Control
                  type='text'
                  className='form-control'
                  value={setTelephone()}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <label>Organisme </label>
                <select className='form-control form-control-lg' name='organisme' disabled>
                  <option value=''>{setOrganisme()}</option>
                  {organismes && organismes.length
                    ? organismes.map((organisme, index) => (
                        <option value={organisme._id} key={index}>
                          {organisme.nom}
                        </option>
                      ))
                    : null}
                </select>
              </Form.Group>
              <Form.Group>
                <label>Mot de passe</label>
                <Form.Control type='password' className='form-control' disabled />
              </Form.Group>
              <div className='text-right'>
                <button className='btn btn-primary' onClick={() => history.push('/modifierProfil')}>
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
