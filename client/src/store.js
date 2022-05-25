import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducer'
import {
  organismeListReducer,
  organismeCreateReducer,
  organismeUpdateReducer,
  organismeDeleteReducer,
  organismeRegisterReducer,
} from './reducers/organismeReducer'
import {
  employeListReducer,
  employeDeleteReducer,
  employeCreateReducer,
  employeDemandeReducer,
  employeAcceptReducer,
  employeDesactiverReducer,
  employeUpdateReducer,
} from './reducers/employeReducer'
import {
  salleListReducer,
  salleCreateReducer,
  salleUpdateReducer,
  salleDeleteReducer,
  salleStateReducer,
} from './reducers/salleReducer'
import {
  ressourceListReducer,
  ressourceAdminReducer,
  ressourceCreateReducer,
  ressourceUpdateReducer,
  ressourceDeleteReducer,
  ressourceCategorieReducer,
  ressourceReservationReducer,
} from './reducers/ressourceReducer'
import {
  categorieListReducer,
  categorieCreateReducer,
  categorieUpdateReducer,
  categorieDeleteReducer,
  categorieIdReducer,
} from './reducers/categorieReducer'
import {
  reservationCreateReducer,
  reservationListReducer,
  reservationDeleteReducer,
  reservationAcceptReducer,
  reservationUpdateReducer,
  reservationLibererReducer,
  reservationDispoReducer,
} from './reducers/reservationReducer'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,

  organismeList: organismeListReducer,
  organismeCreate: organismeCreateReducer,
  organismeUpdate: organismeUpdateReducer,
  organismeDelete: organismeDeleteReducer,
  organismeRegister: organismeRegisterReducer,

  employeList: employeListReducer,
  employeDemande: employeDemandeReducer,
  employeDelete: employeDeleteReducer,
  employeCreate: employeCreateReducer,
  employeAccept: employeAcceptReducer,
  employeDesactiver: employeDesactiverReducer,
  employeUpdate: employeUpdateReducer,

  salleList: salleListReducer,
  salleCreate: salleCreateReducer,
  salleUpdate: salleUpdateReducer,
  salleDelete: salleDeleteReducer,

  ressourceList: ressourceListReducer,
  ressourceAdmin: ressourceAdminReducer,
  ressourceCreate: ressourceCreateReducer,
  ressourceUpdate: ressourceUpdateReducer,
  ressourceDelete: ressourceDeleteReducer,
  ressourceCategorie: ressourceCategorieReducer,
  ressourceReservation: ressourceReservationReducer,

  categorieList: categorieListReducer,
  categorieCreate: categorieCreateReducer,
  categorieUpdate: categorieUpdateReducer,
  categorieDelete: categorieDeleteReducer,
  categorieId: categorieIdReducer,

  reservationCreate: reservationCreateReducer,
  reservationList: reservationListReducer,
  reservationDelete: reservationDeleteReducer,
  reservationAccept: reservationAcceptReducer,
  reservationUpdate: reservationUpdateReducer,
  reservationLiberer: reservationLibererReducer,
  reservationDispo: reservationDispoReducer,
})

const userInfoFormStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFormStorage },
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
