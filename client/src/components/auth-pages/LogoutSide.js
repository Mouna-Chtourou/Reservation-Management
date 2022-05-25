import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css.css'
import { logout } from '../../actions/userActions'
import { useHistory } from 'react-router-dom'

function LogOut() {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)

  const { userInfo } = userLogin

  async function logoutHandler() {
    dispatch(logout())
  }

  useEffect(() => {}, [userInfo])

  return (
    <li className='nav-item sidebar-user-actions'>
      <div className='sidebar-user-menu'>
        <a href='!#' onClick={logoutHandler} className='nav-link'>
          <i className='mdi mdi-logout menu-icon'></i>
          <span className='menu-title'>Logout</span>
        </a>
      </div>
    </li>
  )
}

export default LogOut
