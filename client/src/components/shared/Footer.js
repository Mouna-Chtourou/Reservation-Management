import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Footer() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <>
      {userInfo && userInfo.role === 'employe' ? (
        <>
          <footer className='footerEmp'>
            <div className='container-fluid'>
              <div className='d-sm-flex justify-content-center justify-content-sm-between py-2 w-100'>
                <span className='text-muted text-center text-sm-left d-block d-sm-inline-block'></span>
                <span className='float-none float-sm-right d-block mt-1 mt-sm-0 text-center'>
                  Copyright©
                  <a href='https://www.medianet.tn/fr/' target='_blank' rel='noopener noreferrer'>
                    Medianet
                  </a>{' '}
                  Startup Village
                </span>
              </div>
            </div>
          </footer>{' '}
        </>
      ) : (
        <>
          {' '}
          <footer className='footer'>
            <div className='container-fluid'>
              <div className='d-sm-flex justify-content-center justify-content-sm-between py-2 w-100'>
                <span className='text-muted text-center text-sm-left d-block d-sm-inline-block'></span>
                <span className='float-none float-sm-right d-block mt-1 mt-sm-0 text-center'>
                  Copyright©
                  <a href='https://www.medianet.tn/fr/' target='_blank' rel='noopener noreferrer'>
                    Medianet
                  </a>{' '}
                  Startup Village
                </span>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  )
}

export default Footer
