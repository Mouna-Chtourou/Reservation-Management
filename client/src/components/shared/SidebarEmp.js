import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Collapse } from 'react-bootstrap'
import LogoutSide from '../auth-pages/LogoutSide'

class SidebarEmp extends Component {
  render() {
    return <nav className='sidebaremp sidebar-offcanvas' id='sidebar'></nav>
    
  }
}

export default withRouter(SidebarEmp)
