import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, isTelephone } from '../utils/validation'
import { updateOrganisme, stateOrganisme } from '../../actions/organismeActions'
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
  const [representant, setRepresentant] = useState(props.representant)
  const [nbr_employe, setNbr_employe] = useState(props.nbr_employe)
  const [telephone, setTelephone] = useState(props.telephone)
  const [fax, setFax] = useState(props.fax)

  const dispatch = useDispatch()

  const organismeUpdate = useSelector(state => state.organismeUpdate)
  const { success,loading, error } = organismeUpdate

  const resetHandler = () => {
    setNom(props.nom)
    setRepresentant(props.representant)
    setNbr_employe(props.nbr_employe)
    setTelephone(props.telephone)
    setFax(props.fax)
  }
  const [representants, setRepresentants] = useState([])
  const getRepresentant = async () => {
    const data = await axios.get('/users/representants')
    setRepresentants(data.data)
  }
  useEffect(() => {
    getRepresentant()
  }, [])
  const updateHandler = e => {
    e.preventDefault()
    if (
      isEmpty(nom) ||
      isEmpty(representant) ||
      isEmpty(nbr_employe) ||
      isEmpty(telephone) ||
      isEmpty(fax)
    )
      return setMessage({
        err: ' Merci de remplir tous les champs.',
        suc: '',
      })
    if (!isTelephone(telephone))
      return setMessage({
        err: 'Numéro de télephone doit avoir 8 chiffres.',
        suc: '',
      })
    if (!isTelephone(fax))
      return setMessage({
        err: 'Numéro de fax doit avoir 8 chiffres.',
        suc: '',
      })
    dispatch(updateOrganisme(props._id, nom, representant, nbr_employe, telephone, fax))
  
    if (!nom || !representant || !nbr_employe || !telephone || !fax) return
    resetHandler()
  }

  useEffect(() => {
    if (success) {
      Swal.fire('Organisme modifié avec succès', '', 'success')
      dispatch(stateOrganisme())
    }
  }, [success])
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
                <h4 className='card-title'>Modifier une organisme</h4>
                <form className='forms-sample' onSubmit={updateHandler}>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Nom</label>
                    <div className='col-sm-9'>
                      <Form.Control
                        type='text'
                        className='form-control'
                        id='exampleInputUsername2'
                        placeholder="Nom de l'organisme"
                        onChange={e => setNom(e.target.value)}
                        value={nom}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Représentant de l'organisme</label>
                    <div className='col-sm-9'>
                      <select
                        className='form-control form-control-lg'
                        name='representant'
                        onChange={e => setRepresentant(e.target.value)}
                        value={representant._id}
                      >
                        {representants && representants.length
                          ? representants.map((rep, index) => (
                              <option value={rep._id} key={index}>
                                {rep.prenom + ' ' + rep.nom}
                              </option>
                            ))
                          : null}
                      </select>
                    </div>
                  </Form.Group>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Télephone</label>
                    <div className='col-sm-9'>
                      <Form.Control
                        type='text'
                        className='form-control'
                        placeholder='Numéro de télephone'
                        onChange={e => setTelephone(e.target.value)}
                        value={telephone}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Fax</label>
                    <div className='col-sm-9'>
                      <Form.Control
                        type='text'
                        className='form-control'
                        placeholder='Numéro de Fax'
                        onChange={e => setFax(e.target.value)}
                        value={fax}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className='row'>
                    <label
                      htmlFor='exampleInputConfirmPassword2'
                      className='col-sm-3 col-form-label'
                    >
                      Nombre des emplyés
                    </label>
                    <div className='col-sm-9'>
                      <Form.Control
                        type='number'
                        className='form-control'
                        placeholder='0'
                        min='0'
                        onChange={e => setNbr_employe(e.target.value)}
                        value={nbr_employe}
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
