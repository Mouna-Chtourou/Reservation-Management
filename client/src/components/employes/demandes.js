import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout.js'
import { useHistory } from 'react-router-dom'
import { demandeEmployes, acceptEmployes } from '../../actions/employeActions.js'
import Swal from 'sweetalert2'

function Demandes({ search }) {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const employeDemande = useSelector(state => state.employeDemande)
  const { loading, error, employes } = employeDemande

  const employeAccept = useSelector(state => state.employeAccept)
  const { success } = employeAccept
  const history = useHistory()

  useEffect(() => {
    dispatch(demandeEmployes())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, history, userInfo, success])

  const acceptHandler = id => {
    dispatch(acceptEmployes(id))
    Swal.fire('Compte employé accepté avec succès', '', 'success')
  }
  return (
    <Layout>
      <div className='col-lg-10 grid-margin stretch-card ml-5'>
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'>Liste des demandes d'inscriptions</h4>
            <div className='table-responsive'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>Employé</th>
                    <th>Organisme</th>
                    <th>Date d'inscription</th>
                    <th>Accepter</th>
                  </tr>
                </thead>
                <tbody>
                  {employes && employes.length ? (
                    employes
                      .reverse()
                      // .filter((filteredEmploye) =>
                      //    filteredEmploye.nom
                      //     .toLowerCase()
                      //     .includes(search.toLowerCase())
                      //   )
                      .map((employe, index) => (
                        <tr key={employe.id}>
                          <td>{employe.prenom + ' ' + employe.nom}</td>
                          <td>{employe.organisme.nom}</td>
                          <td>{employe.createdAt.toString().slice(0, 10)}</td>
                          <td>
                            {' '}
                            <button
                              id='removeBtn'
                              type='button'
                              className='btn btn-outline-success btn-icon'
                              onClick={() => acceptHandler(employe._id)}
                            >
                              <i className='mdi mdi-18px mdi-account-check'></i>
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
    </Layout>
  )
}

export default Demandes
