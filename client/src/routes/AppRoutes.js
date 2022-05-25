import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Spinner from '../components/shared/Spinner'

const Dashboard = lazy(() => import('../components/dashboard/Dashboard'))
const Login = lazy(() => import('../components/auth-pages/Login'))
const Register = lazy(() => import('../components/auth-pages/Register'))
const Organisme = lazy(() => import('../components/Organismes/Organismes'))
const AjouterOrganisme = lazy(() => import('../components/Organismes/AjouterOrganisme'))
const Profile = lazy(() => import('../components/user-pages/profile'))
const ProfileEdit = lazy(() => import('../components/user-pages/editProfile'))
const EmailVerifie = lazy(() => import('../components/email/emailVerify'))
const ForgotPassword = lazy(() => import('../components/auth-pages/ForgotPassword'))
const ResetPassword = lazy(() => import('../components/auth-pages/ResetPassword'))
const Employe = lazy(() => import('../components/employes/employes'))
const AjouterEmploye = lazy(() => import('../components/employes/ajouterEmploye'))
const Demandes = lazy(() => import('../components/employes/demandes'))
const ContinuerSingup = lazy(() => import('../components/employes/continuerSingup'))
const Salle = lazy(() => import('../components/salles/Salles'))
const AjouterSalle = lazy(() => import('../components/salles/AjouterSalle'))
const Ressource = lazy(() => import('../components/ressources/ressources'))
const AjouterRessource = lazy(() => import('../components/ressources/AjouterRessource'))
const Categorie = lazy(() => import('../components/categories/categories'))
const AjouterCategorie = lazy(() => import('../components/categories/ajouterCategorie'))
const Calendrier = lazy(() => import('../components/reservations/calendrier'))
const Reservation = lazy(() => import('../components/reservations/reservation'))
const ReservationList = lazy(() => import('../components/reservations/ReservationsList'))
const DemandeReservation = lazy(() => import('../components/reservations/demandesRes'))
const ReservationListAdmin = lazy(() => import('../components/reservations/adminReservations'))

function AppRoutes() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/register' component={Register} />

        <Route path='/employes/liste' component={Employe} />
        <Route path='/employes/ajouter' component={AjouterEmploye} />
        <Route path='/ressources/liste' component={Ressource} />
        <Route path='/ressources/ajouter' component={AjouterRessource} />
        <Route path='/profil' component={Profile} />
        <Route path='/modifierProfil' component={ProfileEdit} />
        <Route path='/users/:id/verify/:token' component={EmailVerifie} />
        <Route path='/forgetpassword' component={ForgotPassword} />
        <Route path='/users/verifyPassword/:id/:token' component={ResetPassword} />
        <Route path='/employes/inscription/:id' component={ContinuerSingup} />
        <Route path='/salles/liste' component={Salle} />
        <Route path='/salles/ajouter' component={AjouterSalle} />
        <Route path='/categories/liste' component={Categorie} />
        <Route path='/categories/ajouter' component={AjouterCategorie} />
        <Route path='/reservations/calendrier' component={Calendrier} />
        <Route path='/reservations/reserver' component={Reservation} />
        <Route path='/demandes/reservations' component={DemandeReservation} />  
        
        <Route path='/reservations/liste' component={ReservationList} />
        <Route path='/reservations/admin' component={ReservationListAdmin} />
 
        {/* {userInfo && userInfo.role==="admin" && <Switch> */}

        <Route path='/organismes/liste' component={Organisme} />
        <Route path='/organismes/ajouter' component={AjouterOrganisme} />
        <Route path='/demandes' component={Demandes} />

        {/* </Switch>
        } */}
        <Route path='/' component={Login} />
        <Redirect to='/' />
      </Switch>
    </Suspense>
  )
}

export default AppRoutes
