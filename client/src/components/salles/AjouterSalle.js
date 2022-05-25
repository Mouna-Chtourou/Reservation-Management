import React, { useEffect, useState } from 'react'
import Layout from '../layout.js'
import Select from 'react-select'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import { createSalle, stateSalle } from '../../actions/salleActions'
import { isEmpty } from '../utils/validation'
import { listOrganismes } from '../../actions/organismeActions'
import { listRessourcesByCat } from '../../actions/ressourceActions'
import Swal from 'sweetalert2'
import bsCustomFileInput from 'bs-custom-file-input'

const initialState = {
  reference: '',
  nom: '',
  organisme: '',
  capacité: '',
  description: '',
  image: '',
  err: '',
  suc: '',
}

const authorizedTypes = ['image/png', 'image/jpg', 'image/jpeg']

function AjouterSalle() {
  const dispatch = useDispatch()
  const [salle, setSalle] = useState(initialState)
  const { reference, nom, organisme, capacité, description, image, err, suc } = salle
  const [ressource, setRessource] = useState([])
  //const [options, setOptions] = useState(initial)
  const handleChangeInput = e => {
    const { name, value } = e.target
    setSalle({ ...salle, [name]: value, err: '', suc: '' })
  }
  const handlePhoto = e => {
    if (e.target.files.length < 1) {
      return
    }
    const file = e.target.files[0]
    if (!authorizedTypes.includes(file.type)) {
      return showErrMsg('File invalide')
    }

    setSalle({ ...salle, image: e.target.files[0], err: '', suc: '' })
  }
  const salleCreate = useSelector(state => state.salleCreate)
  const { error, success } = salleCreate
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const organismeList = useSelector(state => state.organismeList)
  const { organismes } = organismeList
  // const ressourceList = useSelector((state) => state.ressourceList);
  // const { ressources } = ressourceList;
  const ressourceCategorie = useSelector(state => state.ressourceCategorie)
  const { Ressources } = ressourceCategorie
  const history = useHistory()

  const resetHandler = () => {
    setSalle(initialState)
    setRessource([])
    bsCustomFileInput.init()
  }
  const submitHandler = e => {
    e.preventDefault()
    if (
      isEmpty(reference) ||
      isEmpty(nom) ||
      isEmpty(organisme) ||
      isEmpty(capacité) ||
      isEmpty(description)
    )
      return setSalle({
        ...salle,
        err: ' Merci de remplir tous les champs.',
        suc: '',
      })
    const formData = new FormData()
    formData.append('reference', reference)
    formData.append('nom', nom)
    formData.append('organisme', organisme)
    formData.append('capacité', capacité)
    formData.append('description', description)
    formData.append('ressource', ressource)
    formData.append('image', image)
    dispatch(createSalle(formData))
    resetHandler()
    bsCustomFileInput.init()
    setRessource([])
  }

  useEffect(() => {
    if (success) {
      Swal.fire('Salle ajoutée avec succès', '', 'success')
      history.push('/salles/liste')
      dispatch(stateSalle())
    }
  }, [success])
  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
    dispatch(listOrganismes())
    dispatch(listRessourcesByCat())
    bsCustomFileInput.init()
  }, [])

  const ress =
    Ressources && Ressources.length
      ? Ressources.map((res, index) => ({
          label: 'Catégorie : ' + ' ' + res._id,
          options: res.ress.map((item, j) => ({
            value: item.res_id,
            label: item.res + ' ( ' + item.organisme + ' ) ',
          })),
        }))
      : null
  const handleChangeSelect = e => {
    setRessource(Array.isArray(e) ? e.map(x => x.value) : [])
  }
  return (
    <Layout>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-9 grid-margin stretch-card'>
          <div className='card'>
            {error && showErrMsg(error)}
            {err && showErrMsg(err)}
            {suc && showSuccessMsg(suc)}
            <div className='card-body'>
              <h4 className='card-title'>Ajouter une salle de réunion</h4>
              <form className='forms-sample' onSubmit={submitHandler} encType='multipart/form-data'>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Référence <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='text'
                      className='form-control'
                      placeholder='Référence de la salle'
                      name='reference'
                      onChange={handleChangeInput}
                      value={reference}
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
                      placeholder='Nom de la salle'
                      name='nom'
                      onChange={handleChangeInput}
                      value={nom}
                    />
                  </div>
                </Form.Group>
                {userInfo && userInfo.role === 'representant' ? (
                  <>
                    <Form.Group className='row'>
                      <label className='col-sm-3 col-form-label'>
                        Orgainsme <span className='required'>*</span>
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
                ) : (
                  <>
                    <Form.Group className='row'>
                      <label className='col-sm-3 col-form-label'>
                        Orgainsme <span className='required'>*</span>
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
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Capacité de la salle <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='number'
                      className='form-control'
                      name='capacité'
                      placeholder='0'
                      min='0'
                      onChange={handleChangeInput}
                      value={capacité}
                    />
                  </div>
                </Form.Group>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Photo de la salle <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9 custom-file'>
                    <Form.Control
                      type='file'
                      className='form-control visibility-hidden'
                      id='image'
                      onChange={handlePhoto}
                    />
                    <label className='custom-file-label' htmlFor='image'>
                      Télécharger photo
                    </label>
                  </div>
                </Form.Group>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'> Ressources de la salle </label>
                  <div className='col-sm-9 form-control-multiselect'>
                    <Select
                      isMulti
                      placeholder='Choisir ressource'
                      onChange={handleChangeSelect}
                      options={ress}
                      theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: 'rgba(49,173,225,0.2)',
                        },
                      })}
                    ></Select>
                  </div>
                </Form.Group>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Description <span className='required'>*</span>
                  </label>
                  <div className='col-sm-4'>
                    <div className='form-check'>
                      <label className='form-check-label'>
                        <input
                          type='radio'
                          className='form-check-input'
                          name='description'
                          value='fermée'
                          onChange={handleChangeInput}
                        />
                        Fermée
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
                          name='description'
                          value='ouverte'
                          onChange={handleChangeInput}
                        />
                        Ouverte
                        <i className='input-helper'></i>
                      </label>
                    </div>
                  </div>
                </Form.Group>
                <p aria-hidden='true' id='required-description'>
                  <span className='required ml-2'>*</span> Champ obligatoire
                </p>
                <div className='text-right'>
                  <button type='submit' className='btn btn-primary mr-2 '>
                    Ajouter
                  </button>
                  <Link to='/salles/liste'>
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
export default AjouterSalle
