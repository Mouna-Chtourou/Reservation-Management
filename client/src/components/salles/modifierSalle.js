import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listOrganismes } from '../../actions/organismeActions'
import { updateSalle , stateSalle} from '../../actions/salleActions'
import { showErrMsg, showSuccessMsg } from '../utils/notifications.js'
import Select from 'react-select'
import { Form } from 'react-bootstrap'
import '../css.css'
import { listRessourcesByCat } from '../../actions/ressourceActions'
import Swal from 'sweetalert2'
import bsCustomFileInput from 'bs-custom-file-input'
import { isEmpty, isEmail } from '../utils/validation'

const authorizedTypes = ['image/png', 'image/jpg', 'image/jpeg']

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
    resetHandler()
  }
  const [message, setMessage] = useState(initialState)
  const { err, suc } = message
  const [reference, setReference] = useState(props.reference)
  const [description, setDescription] = useState(props.description)
  const [nom, setNom] = useState(props.nom)
  const [organisme, setOrganisme] = useState(props.organisme._id)
  const [capacité, setCapacité] = useState(props.capacité)
  const [image, setImage] = useState(null)
  const [previewImage, setPreview] = useState(`/uploads/${props.image.toString().slice(25)}`)
  const [ressource, setRessource] = useState(props.ressource.map((item) => item._id))
  const ressourceList = useSelector(state => state.ressourceList)
  const { ressources } = ressourceList
  const ressourceCategorie = useSelector(state => state.ressourceCategorie)
  const { Ressources } = ressourceCategorie

  const options = props.ressource.map((r, j) => {
    return { nom: r.nom, id: r._id , organisme:r.organisme.nom}
  })
  
  const dispatch = useDispatch()
  const organismeList = useSelector(state => state.organismeList)
  const { organismes } = organismeList

  const salleUpdate = useSelector(state => state.salleUpdate)
  const { success,loading, error } = salleUpdate

  const resetHandler = () => {
    setNom(props.nom)
    setOrganisme(props.organisme)
    setCapacité(props.capacité)
  }

  const handlePhoto = e => {
    if (e.target.files.length < 1) {
      return
    }
    const file = e.target.files[0]
    if (!authorizedTypes.includes(file.type)) {
      return showErrMsg('File invalide')
    }
    setImage(e.target.files[0])

    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = readerEvent => {
      setPreview(readerEvent.target.result)
    }
  }

  useEffect(() => {
    bsCustomFileInput.init()
    dispatch(listOrganismes())
    dispatch(listRessourcesByCat())
  }, [])
 
  const updateHandler = e => {
    e.preventDefault()
    if (
      isEmpty(reference) ||
      isEmpty(nom) ||
      isEmpty(organisme) ||
      isEmpty(capacité) ||
      isEmpty(description) ||
      isEmpty(ressource)
    )
      return setMessage({ err: 'Merci de remplir tous les champs.', suc :'' })
    const formData = new FormData()
    formData.append('reference', reference)
    formData.append('nom', nom)
    formData.append('organisme', organisme)
    formData.append('capacité', capacité)
    formData.append('description', description)
    formData.append('ressource', ressource)
    formData.append('image', image)
    
    dispatch(updateSalle(props._id, formData))
    
    if (!nom || !organisme || !capacité) return
    resetHandler()
  }

  useEffect(() => {
    if (success) {
      Swal.fire('Salle modifiée avec succès', '', 'success')
      dispatch(stateSalle())
    }
  }, [success])

  const ress =
    Ressources && Ressources.length
      ? Ressources.map((res) => ({
          label: 'Catégorie : ' + ' ' + res._id,
          options: res.ress.map((item) => ({
            value: item.res_id,
            label: item.res + ' ( ' + item.organisme + ' ) ',
          })),
        }))
      : null

   const handleChangeSelect = e => {
    setRessource(Array.isArray(e) ? e.map(x => x.value) : [] )
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
                <h4 className='card-title'>Modifier une salle</h4>
                <form
                  className='forms-sample'
                  onSubmit={updateHandler}
                  encType='multipart/form-data'
                >
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Référence</label>
                    <div className='col-sm-9'>
                      <Form.Control
                        type='text'
                        clas                        
                        sName='form-control'
                        placeholder='Référence de la salle'
                        name='reference'
                        onChange={e => setReference(e.target.value)}
                        value={reference}
                      />
                    </div>
                  </Form.Group>
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
                    <label className='col-sm-3 col-form-label'>Organisme</label>
                    <div className='col-sm-9'>
                      <select
                        className='form-control form-control-lg'
                        name='organisme'
                        onChange={e => setOrganisme(e.target.value)}
                        value={organisme}
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
                    <label className='col-sm-3 col-form-label'>Capacité de la salle</label>
                    <div className='col-sm-9'>
                      <Form.Control
                        type='number'
                        className='form-control'
                        placeholder='0'
                        min='0'
                        name='capacité'
                        onChange={e => setCapacité(e.target.value)}
                        value={capacité}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Photo de la salle</label>
                    <div className='text-center mb-2'>
                      <img src={previewImage} alt='No photo' className='img-salle' />
                    </div>
                    <div className='col-sm-9 custom-file ml-5 '>
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
                        defaultValue={options.map((e) => ({ label:e.nom + "("+ e.organisme +")", value: e.id }))}
                        onChange={handleChangeSelect}
                        options={ress}
                      ></Select>
                    </div>

                  </Form.Group>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Description</label>

                    {[
                      { label: 'Fermée', value: 'fermée' },
                      { label: 'Ouverte', value: 'ouverte' },
                    ].map(({ value, label }) => (
                      <div key={value} className='col-sm-4'>
                        <div className='form-check'>
                          <label className='form-check-label'>
                            <input
                              type='radio'
                              className='form-check-input'
                              name='description'
                              value={value}
                              checked={description === value}
                              onChange={e => setDescription(value)}
                            />
                            {label}
                            <i className='input-helper'></i>
                          </label>
                        </div>
                      </div>
                    ))}
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
