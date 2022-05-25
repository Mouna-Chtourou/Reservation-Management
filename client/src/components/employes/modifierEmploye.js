import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listOrganismes } from '../../actions/organismeActions'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import { Form } from 'react-bootstrap'
import '../css.css'
import { updateEmploye } from '../../actions/employeActions'
import Swal from 'sweetalert2'
import { isEmpty, isEmail } from '../utils/validation'

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
  const [email, setEmail] = useState(props.email)
  const [organisme, setOrganisme] = useState(props.organisme)
  const [role, setRole] = useState(props.role)

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const employeUpdate = useSelector(state => state.employeUpdate)
  const { success: successUpdate, error } = employeUpdate

  const organismeList = useSelector(state => state.organismeList)
  const { organismes } = organismeList

  const resetHandler = () => {
    setEmail(props.email)
    setOrganisme(props.organisme)
    setRole(props.role)
  }

  useEffect(() => {
    dispatch(listOrganismes())
  }, [])

  const updateHandler = e => {
    e.preventDefault()
    if (
      isEmpty(email) ||
      isEmpty(organisme) ||
      isEmpty(role)
    )
      return setMessage({ err: 'Merci de remplir tous les champs.', suc :'' })
    if (!isEmail(email)) return setMessage({ err: 'Email invalide.', suc: '' })
    try {
      const res = dispatch(updateEmploye(props._id, email, organisme, role))
      setMessage({ err: '', suc: res.data })
      Swal.fire('Employé modifié avec succès', '', 'success')
    } catch (err) {
      setMessage({ err: error, suc: '' })
    }
    if (!email || !organisme || !role) return
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
              {err && showErrMsg(err)}
              {suc && showSuccessMsg(suc)}
              <div className='card-body'>
                <h4 className='card-title'>Modifier un employé</h4>
                <form className='forms-sample' onSubmit={updateHandler}>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>E-mail</label>
                    <div className='col-sm-9'>
                      <Form.Control
                        type='text'
                        className='form-control'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
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
                  {userInfo.role === 'admin' && (
                    <>
                      <Form.Group className='row'>
                        <label className='col-sm-3 col-form-label'>Rôle</label>
                        <div className='col-sm-4'>
                          <div className='form-check'>
                            <label className='form-check-label'>
                              {props.role === 'employe' ? (
                                <>
                                  <input
                                    type='radio'
                                    className='form-check-input'
                                    checked
                                    name='role'
                                    value='employe'
                                    onChange={e => setRole(e.target.value)}
                                  />
                                  Employé
                                  <i className='input-helper'></i>
                                </>
                              ) : (
                                <>
                                  {' '}
                                  <input
                                    type='radio'
                                    className='form-check-input'
                                    name='role'
                                    value='employe'
                                    onChange={e => setRole(e.target.value)}
                                  />
                                  Employé
                                  <i className='input-helper'></i>
                                </>
                              )}
                            </label>
                          </div>
                        </div>
                        <div className='col-sm-5'>
                          <div className='form-check'>
                            <label className='form-check-label'>
                              {props.role === 'representant' ? (
                                <>
                                  <input
                                    type='radio'
                                    className='form-check-input'
                                    name='role'
                                    checked
                                    value='representant'
                                    onChange={e => setRole(e.target.value)}
                                  />
                                  Représentant d'une organisme
                                  <i className='input-helper'></i>
                                </>
                              ) : (
                                <>
                                  <input
                                    type='radio'
                                    className='form-check-input'
                                    name='role'
                                    value='representant'
                                    onChange={e => setRole(e.target.value)}
                                  />
                                  Représentant d'une organisme
                                  <i className='input-helper'></i>
                                </>
                              )}
                            </label>
                          </div>
                        </div>
                      </Form.Group>
                    </>
                  )}
                  <div className='text-right'>
                    <button type='submit' className='btn btn-primary btn btn-primary mr-2 '>
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
