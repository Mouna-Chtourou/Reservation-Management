import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listOrganismes } from '../../actions/organismeActions'
import { listCategories } from '../../actions/categorieActions'
import { updateRessource } from '../../actions/ressourceActions'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import { isEmpty } from '../utils/validation'
import { Form } from 'react-bootstrap'
import '../css.css'
import { stateSalle } from '../../actions/salleActions'
import Swal from 'sweetalert2'

const initialState = {
  suc: '',
  err: '',
}
function Editrow(props) {
  const [isOpen, setIsOpen] = useState(false)

  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }
  const [message, setMessage] = useState(initialState)
  const { err, suc } = message
  const [nom, setNom] = useState(props.nom)
  const [organisme, setOrganisme] = useState(props.organisme)
  const [categorie, setCategorie] = useState(props.categorie)
  const [quantiteDispo, setQuantiteDispo] = useState(props.quantiteDispo)

  const dispatch = useDispatch()
  const organismeList = useSelector(state => state.organismeList)
  const { organismes } = organismeList

  const categorieList = useSelector(state => state.categorieList)
  const { categories } = categorieList

  const ressourceUpdate = useSelector(state => state.ressourceUpdate)
  const { loading, success: successUpdate, error } = ressourceUpdate

  const resetHandler = () => {
    setNom(props.nom)
    setOrganisme(props.organisme)
    setCategorie(props.categorie)
    setQuantiteDispo(props.quantiteDispo)
  }

  useEffect(() => {
    dispatch(listOrganismes())
    dispatch(listCategories())
  }, [])

  const updateHandler = e => {
    e.preventDefault()
    if (isEmpty(nom) || isEmpty(organisme) || isEmpty(categorie))
      return setMessage({ err: ' Merci de remplir tous les champs.', suc: '' })
    try {
      const res = dispatch(updateRessource(props._id, nom, organisme, categorie, quantiteDispo))
      setMessage({ err: '', suc: res.data })
      Swal.fire('Ressource modifiée avec succès', '', 'success')
    } catch (err) {
      setMessage({ err: error, suc: '' })
    }
    if (!nom || !organisme || !categorie) return
    resetHandler()
  }
  return (
    <td>
      <button type='button' className='btn btn-outline-warning btn-icon' onClick={showModal}>
        <i className='mdi mdi-18px mdi-table-edit'></i>
      </button>
      <Modal show={isOpen} onHide={hideModal}>
        <div className=' row d-flex justify-content-center'>
          <div className='mt-3 col-md-10 grid-margin stretch-card'>
            <div className='card'>
              {error && showErrMsg(error)}
              {err && showErrMsg(err)}
              {suc && showSuccessMsg(suc)}
              <div className='card-body'>
                <h4 className='card-title'>Modifier une ressource</h4>
                <form className='forms-sample' onSubmit={updateHandler}>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Nom</label>
                    <div className='col-sm-9'>
                      <Form.Control
                        type='text'
                        className='form-control'
                        onChange={e => setNom(e.target.value)}
                        value={nom}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Organisme</label>
                    <div className='col-sm-9'>
                      <select
                        className='form-control form-control-lg'
                        name='organisme'
                        onChange={e => setOrganisme(e.target.value)}
                        value={organisme._id}
                      >
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
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Catégorie de ressource</label>
                    <div className='col-sm-9'>
                      <select
                        className='form-control form-control-lg'
                        name='categorie'
                        onChange={e => setCategorie(e.target.value)}
                        value={categorie._id}
                      >
                        {categories && categories.length
                          ? categories.map((categ, index) => (
                              <option value={categ._id} key={index}>
                                {categ.nom}
                              </option>
                            ))
                          : null}
                      </select>
                    </div>
                  </Form.Group>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Quantité</label>
                    <div className='col-sm-9'>
                      <Form.Control
                        type='number'
                        className='form-control number'
                        name='quantiteDispo'
                        min='0'
                        onChange={e => setQuantiteDispo(e.target.value)}
                        value={quantiteDispo}
                      />
                    </div>
                  </Form.Group>
                  <div className='text-right'>
                    <button type='submit' className='btn btn-primary mr-2 '>
                      Modifier
                    </button>
                    <button type='reset' className='btn btn-light' onClick={hideModal}>
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </td>
  )
}
export default Editrow
