import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout'
import { listSalles, deleteSalle } from '../../actions/salleActions.js'
import { useHistory } from 'react-router-dom'
import ModifierSalle from './modifierSalle'
import Viewrow from './Viewrow'
import ViewrowImg from './ViewImage'
import Swal from 'sweetalert2'

function SalleList({ search }) {
  const dispatch = useDispatch()

  const salleList = useSelector(state => state.salleList)
  const { salles } = salleList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const salleCreate = useSelector(state => state.salleCreate)
  const { success: successCreate } = salleCreate

  const salleUpdate = useSelector(state => state.salleUpdate)
  const { success: successUpdate } = salleUpdate

  const salleDelete = useSelector(state => state.salleDelete)
  const { success: successDelete } = salleDelete

  const history = useHistory()

  useEffect(() => {
    dispatch(listSalles())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, successCreate, successUpdate, successDelete, history, userInfo])

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
        title: 'Vous êtes sûr que vous voulez supprimer la salle ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true,
      })
      .then(result => {
        if (result.isConfirmed) {
          dispatch(deleteSalle(id))
          swalWithBootstrapButtons.fire(
            'Supprimée avec succès!',
            'La salle est supprimée avec succès.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('annulée', 'Votre salle est en sécurité', 'error')
        }
      })
  }

  return (
    <div className='col-lg-11 grid-margin stretch-card'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Liste des salles de réunion</h4>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>Référence</th>
                  <th>Nom</th>
                  <th>Organisme</th>
                  <th>Capacité</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {salles && salles.length ? (
                  salles
                    .filter(filteredSalle =>
                      filteredSalle.reference.toLowerCase().includes(search.toLowerCase())
                    )
                    .reverse()
                    .map((salle, index) => (
                      <tr key={index}>
                        {userInfo.role === 'representant' &&
                          userInfo.organisme.nom === salle.organisme.nom && (
                            <>
                              <td>{salle.reference}</td>
                              <td>{salle.nom}</td>
                              <td>{salle.organisme.nom}</td>
                              <td>{salle.capacité} </td>
                              <ViewrowImg {...salle} />
                              <Viewrow {...salle} />
                              <ModifierSalle {...salle} />
                              <td>
                                <button
                                  id='removeBtn'
                                  type='button'
                                  className='btn btn-outline-danger btn-icon'
                                  onClick={() => deleteHandler(salle._id)}
                                >
                                  <i className='mdi mdi-18px mdi-delete'></i>
                                </button>
                              </td>
                            </>
                          )}
                        {userInfo.role === 'admin' && (
                          <>
                            <td>{salle.reference}</td>
                            <td>{salle.nom}</td>
                            <td>{salle.organisme.nom}</td>
                            <td>{salle.capacité} </td>
                            <ViewrowImg {...salle} />
                            <Viewrow {...salle} />
                            <ModifierSalle {...salle} />
                            <td>
                              <button
                                id='removeBtn'
                                type='button'
                                className='btn btn-outline-danger btn-icon'
                                onClick={() => deleteHandler(salle._id)}
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
                    <td>Pas de salles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function Salle() {
  return (
    <Layout>
      <SalleList />
    </Layout>
  )
}

export default Salle
