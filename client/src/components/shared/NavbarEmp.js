import React, { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import Logout from '../auth-pages/Logout.js'
import { useDispatch, useSelector } from 'react-redux'

function Navbar({ search, setSearch }) {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  useEffect(() => {}, [userInfo])

  return (
    <nav className='navbar-emp default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row'>
      <div className='importtext-center navbar-brand-wrapper d-flex align-items-center justify-content-center'>
        <Link className='navbar-brand' to='#'>
          <img src={require('../../assets/images/logo.png')} alt='logo' />
        </Link>
        <Link className='navbar-brand brand-logo-mini' to='#'>
          <img src={require('../../assets/images/mini-logo.png')} alt='logo' />
        </Link>
        <h5 className='navbar-start brand-logo '>STARTUP VILLAGE </h5>
      </div>
      <div className='navbar-menu-wrapper d-flex align-items-stretch'>
        <div className='search-field d-none d-md-block'>
          <form className='d-flex align-items-center h-100' action='#'>
            <div className='input-group'>
              <div className='input-group-prepend bg-transparent'>
                <i className='input-group-text border-0 mdi mdi-magnify'></i>
              </div>
              <input
                type='text'
                value={search}
                className='form-control bg-transparent border-0'
                placeholder='Rechercher'
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </form>
        </div>
        <ul className='navbar-nav navbar-nav-right'>
          <li className='nav-item nav-profile nav-language'>
            <Dropdown alignRight>
              <Dropdown.Toggle className='nav-link count-indicator'>
                <div className='nav-profile-text'>
                  <p className='mb-1 colorG'>Réservation</p>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className='preview-list navbar-dropdown'>
                <div className='p-2'>
                  <Dropdown.Item
                    className='dropdown-item d-flex align-items-center justify-content-between'
                    href='/reservations/reserver'
                  >
                    <span>Réserver</span>
                    <span className='p-0'>
                      <i className='mdi mdi-calendar-clock ml-1'></i>
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className='dropdown-item d-flex align-items-center justify-content-between'
                    href='/reservations/admin'
                  >
                    <span>Liste des réservations</span>
                    <span className='p-0'>
                      <i className='mdi mdi-format-list-bulleted ml-1'></i>
                    </span>
                  </Dropdown.Item>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className='nav-item nav-profile nav-language'>
            <Dropdown alignRight>
              <Dropdown.Toggle className='nav-link count-indicator'>
                <div className='nav-profile-text'>
                  <p className='mb-1 colorG'>
                    {' '}
                    {capitalizeFirstLetter(userInfo.prenom) +
                      ' ' +
                      capitalizeFirstLetter(userInfo.nom)}
                  </p>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className='preview-list navbar-dropdown'>
                <div className='p-2'>
                  <h5 className='dropdown-header text-uppercase pl-2 text-dark'>
                    Options Utilisateur
                  </h5>
                  <Dropdown.Item
                    className='dropdown-item d-flex align-items-center justify-content-between'
                    href='/profil'
                  >
                    <span>Profil</span>
                    <span className='p-0'>
                      <i className='mdi mdi-account-outline ml-1'></i>
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className='dropdown-item d-flex align-items-center justify-content-between'
                    href='/modifierProfil'
                  >
                    <span>Modifier profil</span>
                    <i className='mdi mdi-settings'></i>
                  </Dropdown.Item>
                  <div role='separator' className='dropdown-divider'></div>
                  <h5 className='dropdown-header text-uppercase  pl-2 text-dark mt-2'>Actions</h5>
                  <Logout />
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        {/* <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
            <span className="mdi mdi-menu">
              
            </span>
          </button> */}
      </div>
    </nav>
  )
}

export default Navbar
