import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

function RowDescription(props) {
  const [isOpen, setIsOpen] = useState(false)

  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }

  return (
    <td>
      <button type='button' className='btn btn-light mt-1' onClick={showModal}>
        Description
      </button>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Body>
          <div className=' row d-flex justify-content-center'>
            <div className='mt-3 col-md-11 grid-margin stretch-card'>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='card-title'> Desciprtion de la salle</h4>
                  <hr />
                  <li className='text-dark deco'>Ressources : </li>
                  <ul>
                    {props.ressource.length !== 0 ? (
                      props.ressource.map((l, i) => (
                        <li key={i} className='text-dark'>
                          {l.nom + ' : ' + l.categorie.nom}
                        </li>
                      ))
                    ) : (
                      <h6 className='text-dark'>La salle n'a pas des ressources</h6>
                    )}
                  </ul>
                  <li className='text-dark deco'>Salle est : {props.description} </li>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='text-right'>
            <button className='btn btn-light' onClick={hideModal}>
              Fermer
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </td>
  )
}

export default RowDescription
