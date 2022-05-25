import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout.js'
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Editrow from './Editrow'
import { listEmployes, deleteEmploye } from '../../actions/employeActions.js'

function EmployeListRep({ search }) {
  const dispatch = useDispatch()

  const employeList = useSelector(state => state.employeList)
  const { loading, error, employes } = employeList

  const employeCreate = useSelector(state => state.employeCreate)
  const { success: successCreate } = employeCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const employeDelete = useSelector(state => state.employeDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = employeDelete

  const history = useHistory()

  useEffect(() => {
    dispatch(listEmployes())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, history, userInfo, successDelete, successCreate])

  const deleteHandler = id => {
    if (window.confirm("Vous êtes sûr que vous voulez supprimer l'employé ?")) {
      dispatch(deleteEmploye(id))
    }
  }

  return (
    <div className='col-lg-12 grid-margin stretch-card'>
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
                  <th>Supprimer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employes &&
                  employes.length &&
                  employes
                    .filter(filteredEmploye =>
                      filteredEmploye.organisme.nom.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((employe, index) => (
                      <tr key={index}>
                        <td>{employe.prenom + ' ' + employe.nom}</td>
                        <td>{employe.email}</td>
                        <td>{employe.organisme.nom} </td>
                        <td>{employe.telephone}</td>
                        <td>{employe.role}</td>
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
                          {employe.status === false ? (
                            <label className='badge badge-warning'>En attente</label>
                          ) : (
                            <label className='badge badge-success'>Accepté</label>
                          )}
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

function Employe() {
  return (
    <Layout>
      <EmployeList />
    </Layout>
  )
}

export default Employe
