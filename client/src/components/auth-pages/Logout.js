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
    <div className='text-center btn-log'>
      <button
        className='dropdown-item d-flex align-items-center justify-content-between'
        onClick={logoutHandler}
      >
        Logout
        <i className='mdi mdi-logout ml-1'></i>
      </button>
    </div>
  )
}

export default LogOut
