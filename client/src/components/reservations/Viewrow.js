import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

function Viewrow(props) {
  const [isOpen, setIsOpen] = useState(false)

  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }

  return (
    <td>
      <button type='button' className='btn btn-outline-info btn-icon' onClick={showModal}>
        <i className='mdi mdi-18px mdi-eye-outline'></i>
      </button>
      <Modal show={isOpen} onHide={hideModal}>
      <div className='center-div'>
          <div className=' row d-flex justify-content-center'>
            <div className='mt-3 col-md-11 grid-margin stretch-card'>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='card-title'> Ressources reservées pour la réunion : </h4>
                  <hr />
                  <li className='text-dark deco'>Ressources reservées : </li>
                  <ul>
                    {props.ressource.length !== 0 ? (
                      props.ressource.map((r, i) => (
                        <li key={i} className='text-dark'>
                          {r.nom}
                        </li>
                      ))
                    ) : (
                      <p className='text-dark'>Réservation sans ressource ajoutée</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        <div classname="model-footer">
          <div className='text-right'>
            <button className='btn btn-light' onClick={hideModal}>
              Fermer
            </button>
          </div>
        </div>
        </div>
      </Modal>
    </td>
  )
}

export default Viewrow
