import React, { useEffect, useState } from 'react'
import Layout from '../layout.js'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link, Redirect } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import { createOrganisme, stateOrganisme } from '../../actions/organismeActions'
import { isEmpty, isTelephone, isFax } from '../utils/validation'
import Swal from 'sweetalert2'
import axios from 'axios'
const initialState = {
  nom: '',
  representant: '',
  nbr_employe: '',
  telephone: '',
  fax: '',
  err: '',
  suc: '',
}

function AjouterOrganisme() {
  const dispatch = useDispatch()

  const [organisme, setOrganisme] = useState(initialState)
  const { nom, representant, nbr_employe, telephone, fax, err, suc } = organisme

  const handleChangeInput = e => {
    const { name, value } = e.target
    setOrganisme({ ...organisme, [name]: value, err: '', suc: '' })
  }

  const organismeCreate = useSelector(state => state.organismeCreate)
  const { error, success } = organismeCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const history = useHistory()

  const resetHandler = () => {
    setOrganisme(initialState)
  }

  const submitHandler = e => {
    e.preventDefault()
    if (
      isEmpty(nom) ||
      isEmpty(representant) ||
      isEmpty(nbr_employe) ||
      isEmpty(telephone) ||
      isEmpty(fax)
    )
      return setOrganisme({
        ...organisme,
        err: ' Merci de remplir tous les champs.',
        suc: '',
      })
    if (!isTelephone(telephone))
      return setOrganisme({
        ...organisme,
        err: 'Numéro de télephone doit avoir 8 chiffres.',
        suc: '',
      })

    if (!isTelephone(fax))
      return setOrganisme({
        ...organisme,
        err: 'Numéro de fax doit avoir 8 chiffres.',
        suc: '',
      })

    dispatch(createOrganisme(nom, representant, nbr_employe, telephone, fax))
    resetHandler()
  }

  useEffect(() => {
    if (success) {
      Swal.fire('Organisme ajouté avec succès', '', 'success')
      history.push('/organismes/liste')
      dispatch(stateOrganisme())
    }
  }, [success])

  const [representants, setRepresentants] = useState([])
  const getRepresentant = async () => {
    const data = await axios.get('/users/representants')
    setRepresentants(data.data)
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
    getRepresentant()
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
              <h4 className='card-title'>Ajouter une organisme</h4>
              <form className='forms-sample' onSubmit={submitHandler}>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Nom <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='text'
                      className='form-control'
                      placeholder="Nom de l'organisme"
                      name='nom'
                      onChange={handleChangeInput}
                      value={nom}
                    />
                  </div>
                </Form.Group>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Représentant de l'organisme <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <select
                      className='form-control form-control-lg'
                      name='representant'
                      onChange={handleChangeInput}
                      value={representant}
                    >
                      <option> Choisir représentant </option>
                      {representants && representants.length
                        ? representants.map((representant, index) => (
                            <option value={representant._id} key={index}>
                              {representant.prenom + ' ' + representant.nom}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </Form.Group>
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
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Fax <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='text'
                      className='form-control'
                      placeholder='Numéro de Fax'
                      name='fax'
                      onChange={handleChangeInput}
                      value={fax}
                    />
                  </div>
                </Form.Group>
                <Form.Group className='row'>
                  <label htmlFor='exampleInputConfirmPassword2' className='col-sm-3 col-form-label'>
                    Nombre des emplyés
                    <span class='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='number'
                      className='form-control'
                      name='nbr_employe'
                      placeholder='0'
                      min='0'
                      onChange={handleChangeInput}
                      value={nbr_employe}
                    />
                  </div>
                </Form.Group>
                <p aria-hidden='true' id='required-description'>
                  <span className='required ml-2'>*</span> Champ obligatoire
                </p>
                <div className='text-right'>
                  <button type='submit' className='btn btn-primary mr-2 '>
                    Ajouter
                  </button>
                  <Link to='/organismes/liste'>
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
export default AjouterOrganisme
