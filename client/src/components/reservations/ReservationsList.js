import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout.js'
import { useHistory, Link } from 'react-router-dom'
import { listReservations, deleteReservation } from '../../actions/reservationActions'
import Swal from 'sweetalert2'
import Viewrow from './Viewrow'
import ReactPaginate from 'react-paginate'
function ReservationList({ search }) {
  const dispatch = useDispatch()

  const reservationList = useSelector(state => state.reservationList)
  const { loading, error, reservations } = reservationList

  const reservationCreate = useSelector(state => state.reservationCreate)
  const { success: successCreate } = reservationCreate

  //   const employeUpdate = useSelector((state) => state.employeUpdate);
  //   const { success: successUpdate } = employeUpdate;

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const reservationDelete = useSelector(state => state.reservationDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = reservationDelete

  const history = useHistory()

  useEffect(() => {
    dispatch(listReservations())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, history, userInfo, successCreate, successDelete])

  const deleteHandler = id => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons
      .fire({
        title: 'Vous êtes sûr que vous voulez supprimer la réservation ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true,
      })
      .then(result => {
        if (result.isConfirmed) {
          dispatch(deleteReservation(id))
          swalWithBootstrapButtons.fire(
            'Supprimé avec succès!',
            "L'employé est supprimé avec succès.",
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('annulé', 'Votre employé est en sécurité', 'error')
        }
      })
  }
  return (
    <>
      <div className='col-lg-14 grid-margin stretch-card'>
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'>
              Liste des réservations
              <div className='text-right'>
                <Link to='/reservations/admin'>
                  <button type='button' className='btn btn-inverse-success'>
                    Mes réservations
                  </button>
                </Link>
              </div>
            </h4>
            <div className='table-responsive'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Utilisateur</th>
                    <th>Salle</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Ressource</th>
                    {userInfo && userInfo.role === 'employe' ? (
                      <th>Annuler</th>
                    ) : (
                      <th>Supprimer</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {reservations && reservations.length ? (
                    reservations
                      .reverse()
                      .filter(filteredReservattion =>
                        filteredReservattion.salle.nom.toLowerCase().includes(search.toLowerCase())
                      )
                      .map(reser => (
                        <tr key={reser._id}>
                          {userInfo &&
                            userInfo.role === 'representant' &&
                            userInfo._id === reser.user._id && (
                              <>
                                <td>{reser.titre}</td>
                                <td>{reser.user.email} </td>
                                <td>{reser.salle.nom}</td>
                                <td>
                                  {'De ' +
                                    new Date(reser.deDate).toString().slice(16, 21) +
                                    'h / ' +
                                    reser.deDate.toString().slice(0, 10)}{' '}
                                  <br />{' '}
                                  {'Vers ' +
                                    new Date(reser.versDate).toString().slice(16, 21) +
                                    'h / ' +
                                    reser.versDate.toString().slice(0, 10)}
                                </td>
                                <td>
                                  {reser.status === false ? (
                                    <label className='badge badge-warning'>En attente</label>
                                  ) : (
                                    <label className='badge badge-success'>Accepté</label>
                                  )}
                                </td>
                                <Viewrow {...reser} />
                                <td>
                                  {userInfo && userInfo.role === 'employe' ? (
                                    <button
                                      id='removeBtn'
                                      type='button'
                                      className='btn btn-outline-danger btn-icon'
                                      onClick={() => deleteHandler(reser._id)}
                                    >
                                      <i className='mdi mdi-18px mdi-cancel'></i>
                                    </button>
                                  ) : (
                                    <button
                                      id='removeBtn'
                                      type='button'
                                      className='btn btn-outline-danger btn-icon'
                                      onClick={() => deleteHandler(reser._id)}
                                    >
                                      <i className='mdi mdi-18px mdi-delete'></i>
                                    </button>
                                  )}
                                </td>
                              </>
                            )}
                          {userInfo && userInfo.role === 'admin' && (
                            <>
                              <td>{reser.titre}</td>
                              <td>{reser.user.email} </td>
                              <td>{reser.salle.nom}</td>
                              <td>
                                {'De ' +
                                  new Date(reser.deDate).toString().slice(16, 21) +
                                  'h / ' +
                                  reser.deDate.toString().slice(0, 10)}{' '}
                                <br />{' '}
                                {'Vers ' +
                                  new Date(reser.versDate).toString().slice(16, 21) +
                                  'h / ' +
                                  reser.versDate.toString().slice(0, 10)}
                              </td>
                              <td>
                                {reser.status === false ? (
                                  <label className='badge badge-warning'>En attente</label>
                                ) : (
                                  <label className='badge badge-success'>Accepté</label>
                                )}
                              </td>
                              <Viewrow {...reser} />
                              <td>
                                <button
                                  id='removeBtn'
                                  type='button'
                                  className='btn btn-outline-danger btn-icon'
                                  onClick={() => deleteHandler(reser._id)}
                                >
                                  <i className='mdi mdi-18px mdi-delete'></i>
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td>Pas des réservations</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Reservation() {
  return (
    <Layout>
      <ReservationList />
    </Layout>
  )
}

export default Reservation
