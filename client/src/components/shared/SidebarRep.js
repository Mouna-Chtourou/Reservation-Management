import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Collapse } from 'react-bootstrap'
import LogoutSide from '../auth-pages/LogoutSide'

class SidebarRep extends Component {
  state = {}

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false })
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true })
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false })
      })
      this.setState({ [menuState]: true })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged()
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active')
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false })
    })

    const dropdownPaths = [
      { path: '/employes', state: 'employesMenuOpen' },
      { path: '/salles', state: 'sallesMenuOpen' },
      { path: '/ressources', state: 'ressourcesMenuOpen' },
    ]

    dropdownPaths.forEach(obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    })
  }
  render() {
    return (
      <nav className='sidebar sidebar-offcanvas' id='sidebar'>
        <ul className='nav'>
          <li className='nav-item nav-category'>Main</li>
          <li className={this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
            <Link className='nav-link' to='/dashboard'>
              <span className='icon-bg'>
                <i className='mdi mdi-cube menu-icon'></i>
              </span>
              <span className='menu-title'>Dashboard</span>
            </Link>
          </li>
          <li className='nav-item nav-category'> Employés</li>
          <li className={this.isPathActive('/employes') ? 'nav-item active' : 'nav-item'}>
            <div
              className={this.state.employesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
              onClick={() => this.toggleMenuState('employesMenuOpen')}
              data-toggle='collapse'
            >
              <span className='icon-bg'>
                <i className='mdi mdi-contacts menu-icon'></i>
              </span>
              <span className='menu-title'>Employés</span>
              <i className='menu-arrow'></i>
            </div>
            <Collapse in={this.state.employesMenuOpen}>
              <ul className='nav flex-column sub-menu'>
                <li className='nav-item'>
                  <Link
                    className={
                      this.isPathActive('/employes/liste') ? 'nav-link active' : 'nav-link'
                    }
                    to='/employes/liste'
                  >
                    Liste des employés
                  </Link>
                </li>
              </ul>
            </Collapse>
            <Collapse in={this.state.employesMenuOpen}>
              <ul className='nav flex-column sub-menu'>
                <li className='nav-item'>
                  <Link
                    className={
                      this.isPathActive('/employes/ajouter') ? 'nav-link active' : 'nav-link'
                    }
                    to='/employes/ajouter'
                  >
                    Ajouter un employé
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li className='nav-item nav-category'>Salles de réunion/ Ressources</li>
          <li className={this.isPathActive('/salles') ? 'nav-item active' : 'nav-item'}>
            <div
              className={this.state.sallesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
              onClick={() => this.toggleMenuState('sallesMenuOpen')}
              data-toggle='collapse'
            >
              <span className='icon-bg'>
                <i className='mdi mdi-table-chair menu-icon'></i>
              </span>
              <span className='menu-title'>Salles de réunion </span>
              <i className='menu-arrow'></i>
            </div>
            <Collapse in={this.state.sallesMenuOpen}>
              <ul className='nav flex-column sub-menu'>
                <li className='nav-item'>
                  {' '}
                  <Link
                    className={this.isPathActive('/salles/liste') ? 'nav-link active' : 'nav-link'}
                    to='/salles/liste'
                  >
                    Liste salles de réunion
                  </Link>
                </li>
              </ul>
            </Collapse>
            <Collapse in={this.state.sallesMenuOpen}>
              <ul className='nav flex-column sub-menu'>
                <li className='nav-item'>
                  {' '}
                  <Link
                    className={
                      this.isPathActive('/salles/ajouter') ? 'nav-link active' : 'nav-link'
                    }
                    to='/salles/ajouter'
                  >
                    Ajouter une salle
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/ressources') ? 'nav-item active' : 'nav-item'}>
            <div
              className={this.state.ressourcesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
              onClick={() => this.toggleMenuState('ressourcesMenuOpen')}
              data-toggle='collapse'
            >
              <span className='icon-bg'>
                <i className='mdi mdi mdi-printer menu-icon'></i>
              </span>
              <span className='menu-title'> Ressources de réunion </span>
              <i className='menu-arrow'></i>
            </div>
            <Collapse in={this.state.ressourcesMenuOpen}>
              <ul className='nav flex-column sub-menu'>
                <li className='nav-item'>
                  {' '}
                  <Link
                    className={
                      this.isPathActive('/ressources/liste') ? 'nav-link active' : 'nav-link'
                    }
                    to='/ressources/liste'
                  >
                    Liste des ressources
                  </Link>
                </li>
              </ul>
            </Collapse>
            <Collapse in={this.state.ressourcesMenuOpen}>
              <ul className='nav flex-column sub-menu'>
                <li className='nav-item'>
                  {' '}
                  <Link
                    className={
                      this.isPathActive('/ressources/ajouter') ? 'nav-link active' : 'nav-link'
                    }
                    to='/ressources/ajouter'
                  >
                    Ajouter une ressource
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li className='nav-item nav-category'>Réservation</li>
          <li className={this.isPathActive('/reservations') ? 'nav-item active' : 'nav-item'}>
            <div
              className={this.state.reservationsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
              onClick={() => this.toggleMenuState('reservationsMenuOpen')}
              data-toggle='collapse'
            >
              <span className='icon-bg'>
                <i className='mdi mdi-google-classroom menu-icon'></i>
              </span>
              <span className='menu-title'> Réservations </span>
              <i className='menu-arrow'></i>
            </div>
            <Collapse in={this.state.reservationsMenuOpen}>
              <ul className='nav flex-column sub-menu'>
                <li className='nav-item'>
                  {' '}
                  <Link
                    className={
                      this.isPathActive('/reservations/reserver') ? 'nav-link active' : 'nav-link'
                    }
                    to='/reservations/reserver'
                  >
                    Réserver
                  </Link>
                </li>
              </ul>
            </Collapse>
            <Collapse in={this.state.reservationsMenuOpen}>
              <ul className='nav flex-column sub-menu'>
                <li className='nav-item'>
                  {' '}
                  <Link
                    className={
                      this.isPathActive('/reservations/liste') ? 'nav-link active' : 'nav-link'
                    }
                    to='/reservations/liste'
                  >
                    Liste des réservations
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={this.isPathActive('/demandes/reservations') ? 'nav-item active' : 'nav-item'}
          >
            <Link className='nav-link' to='/demandes/reservations'>
              <span className='icon-bg'>
                <i className='mdi mdi-calendar-check menu-icon'></i>
              </span>
              <span className='menu-title'>Demandes de réservation</span>
            </Link>
          </li>
          <li className='nav-item sidebar-user-actions'>
            <div className='sidebar-user-menu'>
              <Link className='nav-link' to='/modifierProfil'>
                <i className='mdi mdi-settings menu-icon'></i>
                <span className='menu-title'>Modifier Profil</span>
              </Link>
            </div>
          </li>
          <LogoutSide />
        </ul>
      </nav>
    )
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path)
  }

  componentDidMount() {
    this.onRouteChanged()
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body')
    document.querySelectorAll('.sidebar .nav-item').forEach(el => {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open')
        }
      })
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open')
        }
      })
    })
  }
}
export default withRouter(SidebarRep)
