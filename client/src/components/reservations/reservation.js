import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout'
import { listSalles } from '../../actions/salleActions.js'
import { useHistory, Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import RowDescription from './rowDescription'
function Reservation(props) {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const salleList = useSelector(state => state.salleList)
  const { loading, error, salles } = salleList

  const history = useHistory()

  useEffect(() => {
    dispatch(listSalles())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, history, userInfo])

  const [isOpen, setIsOpen] = useState(false)

  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Layout>
        <div className='center'>
          <div className=' row'>
            {salles && salles.length
              ? salles.map((salle, index) => (
                  <div className='center-div' key={index}>
                    {userInfo &&
                      userInfo.role === 'representant' &&
                      (userInfo.organisme.nom === salle.organisme.nom ||
                        salle.organisme.nom === 'Startup Village') && (
                        <div className='col-xl-12 col-lg-2 col-sm-2 grid-margin stretch-card'>
                          <div className='card card-res '>
                            <div className='card-body text-center'>
                              <h5 className='mb-2 text-dark font-weight-normal'>
                                {salle.reference}
                              </h5>
                              <h2 className='mb-4 text-dark font-weight-bold'>{salle.nom}</h2>
                              <h4 className='mt-4 mb-0 title-text'>{salle.organisme.nom}</h4>
                              <p className='mb-0  mt-2 text-dark'>Capacité : {salle.capacité}</p>
                              <div className='px-1 d-flex align-items-center'>
                                <Link
                                  to={{
                                    pathname: '/reservations/calendrier',
                                    state: {
                                      id: salle._id,
                                      nom: salle.nom,
                                      organisme: salle.organisme.nom,
                                      org_id: salle.organisme._id,
                                    },
                                  }}
                                >
                                  <button className='btn btn-primary mt-3'> Calendrier</button>
                                </Link>
                              </div>
                              <RowDescription {...salle} />
                            </div>
                          </div>
                        </div>
                      )}
                    {userInfo && userInfo.role === 'admin' && (
                      <div className='col-xl-12 col-lg-2 col-sm-2 grid-margin stretch-card  '>
                        <div className='card card-res' >
                          <div className='card-body text-center'>
                            <h5 className='mb-2 text-dark font-weight-normal'>{salle.reference}</h5>
                            <h2 className='mb-3 text-dark font-weight-bold'>{salle.nom}</h2>
                            <h4 className='mt-4 mb-0 title-text'>{salle.organisme.nom}</h4>
                            <p className='mb-0  mt-2 text-dark'>Capacité : {salle.capacité}</p>
                            <div className='px-1 d-flex align-items-center'>
                              <Link
                                to={{
                                  pathname: '/reservations/calendrier',
                                  state: {
                                    id: salle._id,
                                    nom: salle.nom,
                                    organisme: salle.organisme.nom,
                                    id_org: salle.organisme._id,
                                  },
                                }}
                              >
                                <button className='btn btn-primary mt-3'> Calendrier</button>
                              </Link>
                            </div>
                            <RowDescription {...salle} />
                          </div>
                        </div>
                      </div>
                    )}
                    {userInfo &&
                      userInfo.role === 'employe' &&
                      (userInfo.organisme.nom === salle.organisme.nom ||
                        salle.organisme.nom === 'Startup Village') && (
                        <div className='col-xl-12 col-lg-2 col-sm-2 grid-margin stretch-card'>
                          <div className='card card-res '>
                            <div className='card-body text-center'>
                              <h5 className='mb-2 text-dark font-weight-normal'>
                                {salle.reference}
                              </h5>
                              <h2 className='mb-4 text-dark font-weight-bold'>{salle.nom}</h2>
                              <h4 className='mt-4 mb-0 title-text'>{salle.organisme.nom}</h4>
                              <p className='mb-0  mt-2 text-dark'>Capacité : {salle.capacité}</p>
                              <div className='px-1 d-flex align-items-center'>
                                <Link
                                  to={{
                                    pathname: '/reservations/calendrier',
                                    state: {
                                      id: salle._id,
                                      nom: salle.nom,
                                      organisme: salle.organisme.nom,
                                    },
                                  }}
                                >
                                  <button className='btn btn-primary mt-3'> Calendrier</button>
                                </Link>
                              </div>
                              <RowDescription {...salle} />
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                ))
              : null}
          </div>
        </div>
      </Layout>
    </>
  )
}
export default Reservation
