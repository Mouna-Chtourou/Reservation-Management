import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout.js'
import { useHistory } from 'react-router-dom'
import { listEmployes, deleteEmploye, desactiverEmployes } from '../../actions/employeActions.js'
import Swal from 'sweetalert2'
import ModifierEmploye from './modifierEmploye'

function EmployeList({ search }) {
  const dispatch = useDispatch()

  const employeList = useSelector(state => state.employeList)
  const { loading, error, employes } = employeList

  const employeCreate = useSelector(state => state.employeCreate)
  const { success: successCreate } = employeCreate

  const employeUpdate = useSelector(state => state.employeUpdate)
  const { success: successUpdate } = employeUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const employeDelete = useSelector(state => state.employeDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = employeDelete

  const employeDesactiver = useSelector(state => state.employeDesactiver)
  const { success } = employeDesactiver
  const history = useHistory()

  useEffect(() => {
    dispatch(listEmployes())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, success, successUpdate])

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
        title: "Vous êtes sûr que vous voulez supprimer l'employé ?",
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true,
      })
      .then(result => {
        if (result.isConfirmed) {
          dispatch(deleteEmploye(id))
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
  const desactiverHandler = id => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons
      .fire({
        title: "Vous êtes sûr que vous voulez désactiver compte de l'employé ?",
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, désactiver!',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true,
      })
      .then(result => {
        if (result.isConfirmed) {
          dispatch(desactiverEmployes(id))
          swalWithBootstrapButtons.fire(
            'Désactivé avec succès!',
            "Compte de l'employé est désactivé avec succès.",
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('annulé', 'Compte employé est en sécurité', 'error')
        }
      })
  }
  return (
    <div className='col-lg-13 grid-margin stretch-card'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Liste des employés</h4>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>Prénom et nom</th>
                  <th>E-mail</th>
                  <th>Organisme</th>
                  <th>Télephone</th>
                  <th>Rôle</th>
                  <th>Status</th>
                  <th>Modifier</th>
                  {userInfo.role === 'admin' && <th>Supprimer</th>}
                  <th>Désactiver</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.role === 'representant' && (
                  <>
                    {employes && employes.length ? (
                      employes
                        .filter(filteredEmploye =>
                          filteredEmploye.email.toLowerCase().includes(search.toLowerCase())
                        )
                        .reverse()
                        .map((employe, index) => (
                          <tr key={index}>
                            {employe.role === 'employe' &&
                              employe.organisme.nom === userInfo.organisme.nom && (
                                <>
                                  <td>{employe.prenom + ' ' + employe.nom}</td>
                                  <td>{employe.email}</td>
                                  <td>{employe.organisme.nom} </td>
                                  <td>{employe.telephone}</td>
                                  <td>{employe.role}</td>
                                  <td>
                                    {employe.status === false ? (
                                      <label className='badge badge-warning'>En attente</label>
                                    ) : (
                                      <label className='badge badge-success'>Accepté</label>
                                    )}
                                  </td>
                                  <ModifierEmploye {...employe} />
                                  <td>
                                    {' '}
                                    <button
                                      id='removeBtn'
                                      type='button'
                                      className='btn btn-outline-secondary btn-icon'
                                      onClick={() => desactiverHandler(employe._id)}
                                    >
                                      <i className='mdi mdi-18px mdi mdi-account-off'></i>
                                    </button>
                                  </td>
                                </>
                              )}
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td>No data</td>
                      </tr>
                    )}
                  </>
                )}
                {userInfo.role === 'admin' && (
                  <>
                    {employes && employes.length ? (
                      employes
                        .filter(filteredEmploye =>
                          filteredEmploye.organisme.nom.toLowerCase().includes(search.toLowerCase())
                        )
                        .reverse()
                        .map((employe, index) => (
                          <tr key={index}>
                            <td>{employe.prenom + ' ' + employe.nom}</td>
                            <td>{employe.email}</td>
                            <td>{employe.organisme.nom} </td>
                            <td>{employe.telephone}</td>
                            <td>{employe.role}</td>
                            <td>
                              {employe.status === false ? (
                                <label className='badge badge-warning'>En attente</label>
                              ) : (
                                <label className='badge badge-success'>Accepté</label>
                              )}
                            </td>
                            <ModifierEmploye {...employe} />
                            <td>
                              <button
                                id='removeBtn'
                                type='button'
                                className='btn btn-outline-danger btn-icon'
                                onClick={() => deleteHandler(employe._id)}
                              >
                                <i className='mdi mdi-18px mdi-delete'></i>
                              </button>
                            </td>
                            <td>
                              {' '}
                              <button
                                id='removeBtn'
                                type='button'
                                className='btn btn-outline-secondary btn-icon'
                                onClick={() => desactiverHandler(employe._id)}
                              >
                                <i className='mdi mdi-18px mdi mdi-account-off'></i>
                              </button>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td>Pas d'employés</td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function Employe() {
  return (
    <Layout>
      <EmployeList />
    </Layout>
  )
}

export default Employe
