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
        <div className=' row d-flex justify-content-center'>
          <div className='mt-3 col-md-11 grid-margin stretch-card'>
            <div className='card'>
              <div className='card-body'>
                <h4 className='card-title'> Description de la salle</h4>
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
                    <h5 className='text-dark'>La salle n'a pas des ressources</h5>
                  )}
                </ul>
                <li className='text-dark deco'>Salle est : {props.description} </li>
              </div>
            </div>
          </div>
        </div>
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

export default Viewrow
