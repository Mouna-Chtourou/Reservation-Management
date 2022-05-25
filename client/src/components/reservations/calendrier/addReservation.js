import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import DateTime from 'react-datetime'
import { useSelector } from 'react-redux'
import 'moment/locale/fr'
import { useQuery, useMutation } from 'react-query'
import Select from 'react-select'
import axios from 'axios'
import { showErrMsg } from '../../utils/notifications.js'
import Swal from "sweetalert2";

function AddReservation({
  isOpen = false,
  hideModal = () => null,
  defaultStart = new Date(),
  defaultEnd = new Date(),
  salle,
  refetch,
}) {
  const [title, setTitle] = useState('')
  const [debut, setDebut] = useState(new Date())
  const [fin, setFin] = useState(new Date())
  const [hasRessources, setHasRessources] = useState(false)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const config = {
    headers: { Authorization: `Bearer ${userInfo.token}` },
    params: { debut: debut.toISOString(), fin: fin.toISOString() },
  }

  const [selectedressources, setSelectedRessource] = useState([])

  const { data: ressources } = useQuery(
    `get-availiable-ressources-${debut.toISOString()}-${fin.toISOString()}`,
    () =>
      axios.get('/reservations/disponibilite', config).then(res =>
        res.data.map(({ _id, items }) => ({
          label: _id,
          options: items.map(item => ({
            value: item.res_id,
            label: `${item.res} ( ${item.organisme} ) `,
          })),
        }))
      )
  )

  const { error, ...createReservation } = useMutation(
    () => {
      const reservationData = {
        titre: title,
        salle,
        deDate: debut,
        versDate: fin,
        ressource: selectedressources,
      }
      return axios.post('/reservations/create', reservationData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
    },
    {
      onSuccess: () => {
        refetch()
        hideModal()
        Swal.fire("reservation ajouté avec succès", "", "success");

      },
    }
  )

  useEffect(() => {
    setTitle('')
    setHasRessources(false)
    setDebut(defaultStart)
    setFin(defaultEnd)
  }, [isOpen])

  const handleChangeSelect = e => {
    setSelectedRessource(Array.isArray(e) ? e.map(x => x.value) : [])
  }

  
  return (
    <Modal show={isOpen} onHide={hideModal}>
      <Modal.Header>
        <h4 className='modal-title align-center'>Ajouter une réservation</h4>
      </Modal.Header>
      {error &&
        error.response &&
        error.response.data &&
        error.response.data.message &&
        showErrMsg(error.response.data.message)}
      <Modal.Body className='text-center '>
        <form
          className='forms-sample'
          onSubmit={event => {
            event.preventDefault()
            createReservation.mutate()
          }}
        >
          <Form.Group className='row'>
            <label className='col-sm-3 col-Form-label'>
              Titre <span className='required'>*</span>
            </label>
            <div className='col-sm-7'>
              <Form.Control
                type='text'
                className='form-control'
                placeholder='Ajouter un titre'
                onChange={e => setTitle(e.target.value)}
                value={title}
              />
            </div>
          </Form.Group>
          <Form.Group className='row'>
            <label className='col-sm-3 col-form-label'>
              Date de début <span className='required'>*</span>{' '}
            </label>
            <div className='col-sm-7'>
              <DateTime locale='fr' value={debut} required onChange={date => setDebut(date)} />
            </div>
          </Form.Group>
          <Form.Group className='row'>
            <label className='col-sm-3 col-form-label'>
              Date de fin <span className='required'>*</span>
            </label>
            <div className='col-sm-7'>
              <DateTime locale='fr' value={fin} onChange={date => setFin(date)} required />
            </div>
          </Form.Group>
          
            <Form.Group className='row ressource-box'>
              <label className='col-sm-3 col-form-label'> Ressources </label>
              <div className='text-left col-sm-7 form-control-multiselect'>
                <Select
                  isMulti
                  placeholder='Choisir ressource'
                  onChange={handleChangeSelect}
                  required
                  className='selectRessource'
                  options={ressources || []}
                  theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: { ...theme.colors, primary25: 'rgba(49,173,225,0.2)' },
                  })}
                />
              </div>
            </Form.Group>
          
          <div className='text-left'>
            <p aria-hidden='true' id='required-description'>
              <span className='required ml-4'>*</span> Champ obligatoire
            </p>
          </div>
          <div className='text-right'>
            <button type='submit' className='btn btn-res btn-primary mr-2 '>
              Réserver
            </button>
            <button type='button' className='btn btn-res btn-light' onClick={hideModal}>
              Fermer
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AddReservation