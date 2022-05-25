import React, { useEffect, useState } from 'react'
import Layout from '../layout.js'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import { createCategorie, stateCategorie } from '../../actions/categorieActions'
import { isEmpty } from '../utils/validation'
import Swal from 'sweetalert2'

const initialState = {
  nom: '',
  err: '',
  suc: '',
}

function AjouterCategorie() {
  const dispatch = useDispatch()

  const [categorie, setCategorie] = useState(initialState)
  const { nom, err, suc } = categorie

  const handleChangeInput = e => {
    const { name, value } = e.target
    setCategorie({ ...categorie, [name]: value, err: '', suc: '' })
  }

  const categorieCreate = useSelector(state => state.categorieCreate)
  const { error, success } = categorieCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const history = useHistory()

  const resetHandler = () => {
    setCategorie(initialState)
  }

  const submitHandler = e => {
    e.preventDefault()
    if (isEmpty(nom))
      return setCategorie({
        ...categorie,
        err: ' Merci de remplir tous les champs.',
        suc: '',
      })

    dispatch(createCategorie(nom))
    resetHandler()
  }

  useEffect(() => {
    if (success) {
      Swal.fire('Catégorie ajoutée avec succès', '', 'success')
      history.push('/categories/liste')
      dispatch(stateCategorie())
    }
  }, [success])

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
  }, [])
  return (
    <Layout>
      <div className='row d-flex justify-content-center'>
        <div className='mt-3 col-md-6 grid-margin stretch-card'>
          <div className='card'>
            {error && showErrMsg(error)}
            {err && showErrMsg(err)}
            {suc && showSuccessMsg(suc)}
            <div className='card-body'>
              <h4 className='card-title'>Ajouter une catégorie</h4>

              <form className='forms-sample' onSubmit={submitHandler}>
                <Form.Group className='row'>
                  <label className='col-sm-3 col-form-label'>
                    Nom <span className='required'>*</span>
                  </label>
                  <div className='col-sm-9'>
                    <Form.Control
                      type='text'
                      className='form-control'
                      placeholder='Nom de catégorie'
                      name='nom'
                      onChange={handleChangeInput}
                      value={nom}
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
                  <Link to='/categories/liste'>
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
export default AjouterCategorie
