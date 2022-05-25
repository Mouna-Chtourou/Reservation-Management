import React from 'react'
import './notification.css'
import Swal from 'sweetalert2'

export const showErrMsg = message => {
  return <div className='errMsg'>{message}</div>
}

export const showSuccessMsg = message => {
  return <div className='successMsg'>{message}</div>
}

export const showErrMsgSpan = message => {
  return <span className='errMsgSpan'>{message}</span>
}
