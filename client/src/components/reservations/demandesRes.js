import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout.js'
import { useHistory } from 'react-router-dom'
import { listReservations, acceptReservation } from '../../actions/reservationActions'
import Swal from 'sweetalert2'

function DemandesRes({ search }) {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const reservationList = useSelector(state => state.reservationList)
  const { loading, error, reservations } = reservationList

  const reservationAccept = useSelector(state => state.reservationAccept)
  const { success } = reservationAccept
  const history = useHistory()

  useEffect(() => {
    dispatch(listReservations())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, history, userInfo, success])

  const acceptHandler = id => {
    dispatch(acceptReservation(id))
    Swal.fire('Réservation est accepté avec succès', '', 'success')
  }
  return (
    <Layout>
      <div className='col-lg-11 grid-margin stretch-card ml-4 '>
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'>Liste des demandes de réservations</h4>
            <div className='table-responsive'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>Employé</th>
                    <th>Salle</th>
                    {userInfo && userInfo.role === 'admin' && <th>Organisme de la salle</th>}
                    <th>De</th>
                    <th>Vers</th>
                    <th>Accepter</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations && reservations.length ? (
                    reservations
                      .reverse()
                      // .filter((filteredEmploye) =>
                      //    filteredEmploye.nom
                      //     .toLowerCase()
                      //     .includes(search.toLowerCase())
                      //   )
                      .map((reservation, index) => (
                        <tr key={index}>
                          {userInfo &&
                            userInfo.role === 'representant' &&
                            userInfo.organisme._id === reservation.salle.organisme._id &&
                            reservation.user.role !== 'admin' && (
                              <>
                                {reservation.status === false && (
                                  <>
                                    <td>{reservation.user.email}</td>
                                    <td>{reservation.salle.nom}</td>
                                    <td>
                                      {reservation.deDate.toString().slice(0, 10) +
                                        ' / ' +
                                        reservation.deDate.toString().slice(11, 16)}
                                    </td>
                                    <td>
                                      {reservation.versDate.toString().slice(0, 10) +
                                        ' / ' +
                                        reservation.versDate.toString().slice(11, 16)}
                                    </td>
                                    <td>
                                      {' '}
                                      <button
                                        id='removeBtn'
                                        type='button'
                                        className='btn btn-outline-success btn-icon'
                                        onClick={() => acceptHandler(reservation._id)}
                                      >
                                        <i className='mdi mdi-18px mdi-account-check'></i>
                                      </button>
                                    </td>
                                  </>
                                )}
                              </>
                            )}
                          {userInfo && userInfo.role === 'admin' && (
                            <>
                              {reservation.status === false && (
                                <>
                                  <td>{reservation.user.email}</td>
                                  <td>{reservation.salle.nom}</td>
                                  <td>{reservation.salle.organisme.nom}</td>
                                  <td>
                                    {reservation.deDate.toString().slice(0, 10) +
                                      ' / ' +
                                      reservation.deDate.toString().slice(11, 16)}
                                  </td>
                                  <td>
                                    {reservation.versDate.toString().slice(0, 10) +
                                      ' / ' +
                                      reservation.versDate.toString().slice(11, 16)}
                                  </td>
                                  <td>
                                    {' '}
                                    <button
                                      id='removeBtn'
                                      type='button'
                                      className='btn btn-outline-success btn-icon'
                                      onClick={() => acceptHandler(reservation._id)}
                                    >
                                      <i className='mdi mdi-18px mdi-account-check'></i>
                                    </button>
                                  </td>
                                </>
                              )}
                            </>
                          )}
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td>No data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DemandesRes
