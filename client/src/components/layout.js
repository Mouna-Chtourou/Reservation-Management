import React, { useState, Children, cloneElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './shared/Navbar'
import NavbarEmp from './shared/NavbarEmp'
import Sidebar from './shared/Sidebar'
import SidebarRep from './shared/SidebarRep'
import SidebarEmp from './shared/SidebarEmp'
import Footer from './shared/Footer'
import { Redirect } from 'react-router-dom'

function Layout({ auth = false, authorizedRoles = [], ...props }) {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // useEffect(() => {
  //   if (auth && !userInfo) {
  //     // redirect
  //   }
  // }, [auth])

  // useEffect(() => {
  //   if (auth && !userInfo) {
  //     // redirect
  //   }

  //   if (!authorizedRoles.includes(userInfo.role)) {
  //     // redirect
  //   }
  // }, [auth, userInfo && userInfo.role])

  const [search, setSearch] = useState('')
  if (!userInfo) return <Redirect to='/' />
  return (
    <div className='container-scroller'>
      {userInfo && userInfo.role === 'admin' && <Navbar search={search} setSearch={setSearch} />}
      {userInfo && userInfo.role === 'representant' && (
        <Navbar search={search} setSearch={setSearch} />
      )}
      {userInfo && userInfo.role === 'employe' && <NavbarEmp />}
      <div className='container-fluid page-body-wrapper'>
        {userInfo && userInfo.role === 'admin' && <Sidebar />}
        {userInfo && userInfo.role === 'representant' && <SidebarRep />}
        {userInfo && userInfo.role === 'employe' && <SidebarEmp></SidebarEmp>}
        <div className='main-panel'>
          <div className='content-wrapper'>
            {Children.map(props.children, child => {
              return cloneElement(child, { search: search || '' })
            })}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
export default Layout
