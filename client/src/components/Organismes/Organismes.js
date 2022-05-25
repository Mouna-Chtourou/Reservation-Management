import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout.js'
import { listOrganismes, deleteOrganisme } from '../../actions/organismeActions.js'
import { useHistory } from 'react-router-dom'
import ModifierOrganisme from './ModifierOrganisme'
import Swal from 'sweetalert2'

function OrganismList({ search }) {
  const dispatch = useDispatch()

  const organismeList = useSelector(state => state.organismeList)
  const { organismes } = organismeList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const organismeCreate = useSelector(state => state.organismeCreate)
  const { success: successCreate } = organismeCreate

  const organismeUpdate = useSelector(state => state.organismeUpdate)
  const { success: successUpdate } = organismeUpdate

  const organismeDelete = useSelector(state => state.organismeDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = organismeDelete

  const history = useHistory()

  useEffect(() => {
    dispatch(listOrganismes())
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
        title: "Vous êtes sûr que vous voulez supprimer l'organisme ?",
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true,
      })
      .then(result => {
        if (result.isConfirmed) {
          dispatch(deleteOrganisme(id))
          swalWithBootstrapButtons.fire(
            'Supprimé avec succès!',
            "L'organisme est supprimé avec succès.",
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('annulé', 'Votre organisme est en sécurité', 'error')
        }
      })
  }
  const [isOpen, setIsOpen] = useState(false)

  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }
  return (
    <div className='col-lg-12 grid-margin stretch-card'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Liste des organismes</h4>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Nom du représentant</th>
                  <th>Nombre des employés</th>
                  <th>Télephone</th>
                  <th>Fax</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {organismes && organismes.length ? (
                  organismes
                    .filter(filteredOrganisme =>
                      filteredOrganisme.nom.toLowerCase().includes(search.toLowerCase())
                    )
                    .reverse()
                    .map(organisme => (
                      <tr key={organisme._id}>
                        <td>{organisme.nom}</td>
                        <td>{organisme.representant.prenom + ' ' + organisme.representant.nom}</td>
                        <td>{organisme.nbr_employe} </td>
                        <td>{organisme.telephone}</td>
                        <td>{organisme.fax}</td>
                        <ModifierOrganisme {...organisme} />

                        <td>
                          <button
                            id='removeBtn'
                            type='button'
                            className='btn btn-outline-danger btn-icon'
                            onClick={() => deleteHandler(organisme._id)}
                          >
                            <i className='mdi mdi-18px mdi-delete'></i>
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td>Pas de organismes</td>
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

function Organisme() {
  return (
    <Layout>
      <OrganismList />
    </Layout>
  )
}

export default Organisme
