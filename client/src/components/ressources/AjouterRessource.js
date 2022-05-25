import React, { useEffect, useState } from 'react'
import Layout from '../layout.js'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import { createRessource, stateRessource } from '../../actions/ressourceActions'
import { isEmpty } from '../utils/validation'
import { listOrganismes } from '../../actions/organismeActions'
import { listCategories } from '../../actions/categorieActions.js'
import Swal from 'sweetalert2'

const initialState = {
  nom: '',
  organisme: '',
  categorie: '',
  quantiteDispo: '',
  err: '',
  suc: '',
}

function AjouterRessource() {
  const dispatch = useDispatch()

  const [ressource, setRessource] = useState(initialState)
  const { nom, organisme, categorie, quantiteDispo, err, suc } = ressource

  const handleChangeInput = e => {
    const { name, value } = e.target
    setRessource({ ...ressource, [name]: value, err: '', suc: '' })
  }

  const ressourceCreate = useSelector(state => state.ressourceCreate)
  const { error, success } = ressourceCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const organismeList = useSelector(state => state.organismeList)
  const { organismes } = organismeList

  const categorieList = useSelector(state => state.categorieList)
  const { categories } = categorieList

  const history = useHistory()

  const resetHandler = () => {
    setRessource(initialState)
  }

  const submitHandler = e => {
    e.preventDefault()
    if (isEmpty(nom) || isEmpty(organisme) || isEmpty(categorie))
      return setRessource({
        ...ressource,
        err: ' Merci de remplir tous les champs.',
        suc: '',
      })
    dispatch(createRessource(nom, organisme, categorie, quantiteDispo))
    resetHandler()
  }

  useEffect(() => {
    if (success) {
      Swal.fire('Ressource ajoutée avec succès', '', 'success')
      history.push('/ressources/liste')
      dispatch(stateRessource())
    }
  }, [success])
  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
    dispatch(listOrganismes())
    dispatch(listCategories())
  }, [])
  return (
    <Layout>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-8 grid-margin stretch-card'>
          <div className='card'>
            {error && showErrMsg(error)}
            {err && showErrMsg(err)}
            {suc && showSuccessMsg(suc)}
            <div className='card-body'>
              <h4 className='card-title'>Ajouter une ressource</h4>

              <form className='forms-sample' onSubmit={submitHandler}>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Nom <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='text'
                      className='form-control'
                      placeholder='Nom du ressrouce'
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
                        Orgainsme
                        <span className='required'>*</span>
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
                        Orgainsme
                        <span className='required'>*</span>
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
                    Catégorie
                    <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <select
                      className='form-control form-control-lg'
                      name='categorie'
                      onChange={handleChangeInput}
                      value={categorie}
                    >
                      <option> Choisir catégorie </option>
                      {categories && categories.length
                        ? categories.map((categorie, index) => (
                            <option value={categorie._id} key={index}>
                              {categorie.nom}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </Form.Group>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>Quantité (par défaut 1)</label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='number'
                      className='form-control number'
                      name='quantiteDispo'
                      placeholder='1'
                      min='0'
                      onChange={handleChangeInput}
                      value={quantiteDispo}
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
                  <Link to='/ressources/liste'>
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
export default AjouterRessource
