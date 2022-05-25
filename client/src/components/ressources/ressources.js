import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout'
import Swal from 'sweetalert2'
import { listRessources, deleteRessource, AdminRessources } from '../../actions/ressourceActions.js'
import { useHistory } from 'react-router-dom'
import ModifierRessource from './modifierRessource'

function RessourceList({ search }) {
  const dispatch = useDispatch()

  const ressourceAdmin = useSelector(state => state.ressourceAdmin)
  const { ressource } = ressourceAdmin

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const ressourceCreate = useSelector(state => state.ressourceCreate)
  const { success: successCreate } = ressourceCreate

  const ressourceUpdate = useSelector(state => state.ressourceUpdate)
  const { success: successUpdate } = ressourceUpdate

  const ressourceDelete = useSelector(state => state.ressourceDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = ressourceDelete

  const history = useHistory()

  useEffect(() => {
    dispatch(AdminRessources())

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
        title: 'Vous êtes sûr que vous voulez supprimer la ressource ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true,
      })
      .then(result => {
        if (result.isConfirmed) {
          dispatch(deleteRessource(id))
          swalWithBootstrapButtons.fire(
            'Supprimée avec succès!',
            'La ressource est supprimée avec succès.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('annulée', 'Votre ressource est en sécurité', 'error')
        }
      })
  }

  return (
    <div className='col-lg-12 grid-margin stretch-card'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Liste des ressources</h4>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Organisme</th>
                  <th>Catégorie</th>
                  <th>Quantité disponilbe</th>
                  <th>Quantité reservé</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {ressource &&
                  ressource.length &&
                  ressource
                    .filter(filteredRess =>
                      filteredRess.nom.toLowerCase().includes(search.toLowerCase())
                    )
                    .reverse()
                    .map((ress, index) => (
                      <tr key={index}>
                        <td>{ress.nom}</td>
                        <td>{ress.organisme.nom}</td>
                        <td>{ress.categorie.nom} </td>
                        <td>{ress.quantiteDispo} </td>
                        <td>{ress.quantiteRes} </td>
                        <ModifierRessource {...ress} />
                        <td>
                          <button
                            id='removeBtn'
                            type='button'
                            className='btn btn-outline-danger btn-icon'
                            onClick={() => deleteHandler(ress._id)}
                          >
                            <i className='mdi mdi-18px mdi-delete'></i>
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function Ressource() {
  return (
    <Layout>
      <RessourceList />
    </Layout>
  )
}

export default Ressource
