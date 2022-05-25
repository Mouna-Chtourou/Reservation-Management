import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import '../css.css'
function ViewrowImg(props) {
  const [isOpen, setIsOpen] = useState(false)

  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }
  const path = props.image ? props.image.toString().slice(25) : ''

  return (
    <td>
      <button type='button' className='btn btn-outline-primary btn-icon' onClick={showModal}>
        <i className='mdi mdi-18px mdi-file-image'></i>
      </button>
      <Modal show={isOpen} onHide={hideModal}>
        <div className=' row d-flex justify-content-center'>
          <div className='mt-3 col-md-11 grid-margin stretch-card'>
            <div className='card'>
              <div className='card-body'>
                <h4 className='card-title'> Photo de la salle</h4>
                {props.image ? (
                  <img src={`/uploads/${path}`} alt='No photo' className='img-salle-view' />
                ) : (
                  <p className='text-dark'> Salle n'a pas encore une photo</p>
                )}
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
export default ViewrowImg
