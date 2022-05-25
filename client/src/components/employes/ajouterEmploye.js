import React, { useEffect, useState } from 'react'
import Layout from '../layout.js'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import { createEmploye, stateEmploye } from '../../actions/employeActions'
import { isEmpty, isTelephone, isEmail } from '../utils/validation'
import { listOrganismes } from '../../actions/organismeActions.js'
import Swal from 'sweetalert2'

const initialState = {
  nom: '',
  prenom: '',
  email: '',
  organisme: '',
  telephone: '',
  role: '',
  err: '',
  suc: '',
}

function AjouterEmploye() {
  const dispatch = useDispatch()

  const [employe, setEmploye] = useState(initialState)
  const { nom, prenom, email, organisme, telephone, role, err, suc } = employe

  const handleChangeInput = e => {
    const { name, value } = e.target
    setEmploye({ ...employe, [name]: value, err: '', suc: '' })
  }

  const employeCreate = useSelector(state => state.employeCreate)
  const { error, success } = employeCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const organismeList = useSelector(state => state.organismeList)
  const { organismes } = organismeList

  const history = useHistory()

  const resetHandler = () => {
    setEmploye(initialState)
  }

  const submitHandler = e => {
    e.preventDefault()
    if (
      isEmpty(nom) ||
      isEmpty(prenom) ||
      isEmpty(email) ||
      isEmpty(organisme) ||
      isEmpty(telephone)
    )
      return setEmploye({
        ...employe,
        err: ' Merci de remplir tous les champs.',
        suc: '',
      })
    if (!isTelephone(telephone))
      return setEmploye({
        ...employe,
        err: 'Numéro de télephone doit avoir 8 chiffres.',
        suc: '',
      })
    if (!isEmail(email))
      return setEmploye({
        ...employe,
        err: 'format email invalide.',
        suc: '',
      })
    if (userInfo && userInfo.role === 'representant') {
      setEmploye({ ...employe, role: 'employe' })
    }

    dispatch(createEmploye(nom, prenom, email, organisme, telephone, role))

    resetHandler()
  }
  useEffect(() => {
    if (success) {
      Swal.fire('Employé ajouté avec succès', '', 'success')
      history.push('/employes/liste')
      dispatch(stateEmploye())
    }
  }, [success])

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
    dispatch(listOrganismes())
  }, [])

  return (
    <Layout>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-9 grid-margin stretch-card'>
          <div className='card'>
            {error && showErrMsg(error)}
            {err && showErrMsg(err)}
            {suc && showSuccessMsg(suc)}
            <div className='card-body'>
              <h4 className='card-title'>Ajouter un employé</h4>
              <form className='forms-sample' onSubmit={submitHandler}>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Prénom <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='text'
                      className='form-control'
                      placeholder='Prénom'
                      name='prenom'
                      onChange={handleChangeInput}
                      value={prenom}
                    />
                  </div>
                </Form.Group>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Nom <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='text'
                      className='form-control'
                      placeholder='Nom'
                      name='nom'
                      onChange={handleChangeInput}
                      value={nom}
                    />
                  </div>
                </Form.Group>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    E-mail <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='text'
                      className='form-control'
                      placeholder='Email'
                      name='email'
                      onChange={handleChangeInput}
                      value={email}
                    />
                  </div>
                </Form.Group>
                {userInfo && userInfo.role === 'admin' && (
                  <>
                    <Form.Group className='row'>
                      <label className='col-sm-3 col-form-label'>
                        Organisme <span className='required'>*</span>
                      </label>
                      <div className='col-sm-9'>
                        <select
                          className='form-control form-control-lg'
                          name='organisme'
                          onChange={handleChangeInput}
                          value={organisme}
                        >
                          <option> Choisir organisme </option>
                          {organismes && organismes.length
                            ? organismes.map((organisme, index) => (
                                <option value={organisme._id} key={index}>
                                  {organisme.nom}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </Form.Group>
                  </>
                )}
                {userInfo && userInfo.role === 'representant' && (
                  <>
                    <Form.Group className='row'>
                      <label className='col-sm-3 col-form-label'>
                        Organisme <span className='required'>*</span>
                      </label>
                      <div className='col-sm-9'>
                        <select
                          className='form-control form-control-lg'
                          name='organisme'
                          onChange={handleChangeInput}
                          value={organisme}
                        >
                          <option value='' disabled>
                            Choisir organimse
                          </option>
                          <option value={userInfo && userInfo.organisme._id}>
                            {' '}
                            {userInfo && userInfo.organisme.nom}{' '}
                          </option>
                        </select>
                      </div>
                    </Form.Group>
                  </>
                )}
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Télephone <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='text'
                      className='form-control'
                      placeholder='Numéro de télephone'
                      name='telephone'
                      onChange={handleChangeInput}
                      value={telephone}
                    />
                  </div>
                </Form.Group>
                {userInfo && userInfo.role === 'admin' && (
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>
                      Rôle <span className='required'>*</span>
                    </label>
                    <div className='col-sm-4'>
                      <div className='form-check'>
                        <label className='form-check-label'>
                          <input
                            type='radio'
                            className='form-check-input'
                            name='role'
                            value='employe'
                            onChange={handleChangeInput}
                          />
                          Employé
                          <i className='input-helper'></i>
                        </label>
                      </div>
                    </div>

                    <div className='col-sm-5'>
                      <div className='form-check'>
                        <label className='form-check-label'>
                          <input
                            type='radio'
                            className='form-check-input'
                            name='role'
                            value='representant'
                            onChange={handleChangeInput}
                          />
                          Représentant d'une organisme
                          <i className='input-helper'></i>
                        </label>
                      </div>
                    </div>
                  </Form.Group>
                )}
                <p aria-hidden='true' id='required-description'>
                  <span className='required ml-2'>*</span> Champ obligatoire
                </p>
                <div className='text-right'>
                  <button type='submit' className='btn btn-primary mr-2 '>
                    Ajouter
                  </button>
                  <Link to='/employes/liste'>
                    <button className='btn btn-light' onClick={resetHandler}>
                      Annuler
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default AjouterEmploye
