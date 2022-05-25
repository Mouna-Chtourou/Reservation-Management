import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategorie } from '../../actions/categorieActions'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import { Form } from 'react-bootstrap'
import '../css.css'
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
  const dispatch = useDispatch()
  const categorieUpdate = useSelector(state => state.categorieUpdate)
  const { loading, error } = categorieUpdate

  const resetHandler = () => {
    setNom(props.nom)
  }

  const updateHandler = e => {
    e.preventDefault()
    try {
      const res = dispatch(updateCategorie(props._id, nom))
      setMessage({ err: '', suc: res.data })
      Swal.fire('Catégorie modifiée avec succès', '', 'success')
    } catch (err) {
      setMessage({ err: error, suc: '' })
    }
    if (!nom) return
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
              <div className='card-body'>
                <h4 className='card-title'>Modifier la catégorie</h4>
                <form className='forms-sample' onSubmit={updateHandler}>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Nom</label>
                    <div className='col-sm-9'>
                      <Form.Control
                        type='text'
                        className='form-control'
                        placeholder='Nom du catégorie'
                        onChange={e => setNom(e.target.value)}
                        value={nom}
                        required
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
