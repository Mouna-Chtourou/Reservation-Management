import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout.js'
import { useHistory } from 'react-router-dom'
import ModifierCategorie from './modifierCategorie'
import '../css.css'
import { listCategories, deleteCategorie } from '../../actions/categorieActions.js'
import Swal from 'sweetalert2'

function CategorieList({ search }) {
  const dispatch = useDispatch()

  const categorieList = useSelector(state => state.categorieList)
  const { loading, error, categories } = categorieList

  const categorieCreate = useSelector(state => state.categorieCreate)
  const { success: successCreate } = categorieCreate

  const categorieUpdate = useSelector(state => state.categorieUpdate)
  const { success: successUpdate } = categorieUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const categorieDelete = useSelector(state => state.categorieDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = categorieDelete

  const history = useHistory()

  useEffect(() => {
    dispatch(listCategories())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, successUpdate])

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
        title: 'Vous êtes sûr que vous voulez supprimer la catégorie ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Non, annuler!',
        reverseButtons: true,
      })
      .then(result => {
        if (result.isConfirmed) {
          dispatch(deleteCategorie(id))
          swalWithBootstrapButtons.fire(
            'Supprimée avec succès!',
            'La catégorie est supprimée avec succès.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('annulée', 'Votre catégorie est en sécurité', 'error')
        }
      })
  }

  return (
    <div className='row'>
      <div className='col-sm-6 mx-auto grid-margin stretch-card '>
        <div className='card '>
          <div className='card-body'>
            <h4 className='card-title'>Liste des catégories de ressources</h4>
            <div className='table-responsive'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {categories && categories.length ? (
                    categories
                      .filter(filteredCategorie =>
                        filteredCategorie.nom.toLowerCase().includes(search.toLowerCase())
                      )
                      .reverse()
                      .map((categorie, index) => (
                        <tr key={index}>
                          <td>{categorie.nom}</td>
                          <ModifierCategorie {...categorie} />
                          <td>
                            <button
                              id='removeBtn'
                              type='button'
                              className='btn btn-outline-danger btn-icon'
                              onClick={() => deleteHandler(categorie._id)}
                            >
                              <i className='mdi mdi-18px mdi-delete'></i>
                            </button>
                          </td>
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
    </div>
  )
}

function Categorie() {
  return (
    <Layout>
      <CategorieList />
    </Layout>
  )
}

export default Categorie
