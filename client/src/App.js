import React from 'react'
import './components/App.scss'
import axios from 'axios'
import 'react-datetime/css/react-datetime.css'
import AppRoutes from './routes/AppRoutes'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:5000'

function App() {
  return <AppRoutes />
}
export default App
