import {
  RESSOURCE_LIST_REQUEST,
  RESSOURCE_LIST_SUCCESS,
  RESSOURCE_LIST_FAIL,
  RESSOURCE_CREATE_REQUEST,
  RESSOURCE_CREATE_SUCCESS,
  RESSOURCE_CREATE_FAIL,
  RESSOURCE_UPDATE_REQUEST,
  RESSOURCE_UPDATE_SUCCESS,
  RESSOURCE_UPDATE_FAIL,
  RESSOURCE_DELETE_REQUEST,
  RESSOURCE_DELETE_SUCCESS,
  RESSOURCE_DELETE_FAIL,
  RESSOURCE_STATE_REQUEST,
  RESSOURCE_ADMIN_SUCCESS,
  RESSOURCE_ADMIN_FAIL,
  RESSOURCE_ADMIN_REQUEST,
  RESSOURCE_CATEGORIE_SUCCESS,
  RESSOURCE_CATEGORIE_FAIL,
  RESSOURCE_CATEGORIE_REQUEST,
  RESSOURCE_RESERVATION_SUCCESS,
  RESSOURCE_RESERVATION_FAIL,
  RESSOURCE_RESERVATION_REQUEST,
} from '../constants/ressourceConstant'

export const ressourceListReducer = (state = { ressources: [] }, action) => {
  switch (action.type) {
    case RESSOURCE_LIST_REQUEST:
      return { loading: true }
    case RESSOURCE_LIST_SUCCESS:
      return { loading: false, ressources: action.payload }
    case RESSOURCE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const ressourceCategorieReducer = (state = { Ressources: [] }, action) => {
  switch (action.type) {
    case RESSOURCE_CATEGORIE_REQUEST:
      return { loading: true }
    case RESSOURCE_CATEGORIE_SUCCESS:
      return { loading: false, Ressources: action.payload }
    case RESSOURCE_CATEGORIE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const ressourceReservationReducer = (state = { resource: [] }, action) => {
  switch (action.type) {
    case RESSOURCE_RESERVATION_REQUEST:
      return { loading: true }
    case RESSOURCE_RESERVATION_SUCCESS:
      return { loading: false, resource: action.payload }
    case RESSOURCE_RESERVATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const ressourceAdminReducer = (state = { ressource: [] }, action) => {
  switch (action.type) {
    case RESSOURCE_ADMIN_REQUEST:
      return { loading: true }
    case RESSOURCE_ADMIN_SUCCESS:
      return { loading: false, ressource: action.payload }
    case RESSOURCE_ADMIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const ressourceCreateReducer = (state = { ressources: [] }, action) => {
  switch (action.type) {
    case RESSOURCE_CREATE_REQUEST:
      return { loading: true }
    case RESSOURCE_CREATE_SUCCESS:
      return { loading: false, success: true }
    case RESSOURCE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case RESSOURCE_STATE_REQUEST:
      return { success: false }
    default:
      return state
  }
}

export const ressourceUpdateReducer = (state = { ressources: [] }, action) => {
  switch (action.type) {
    case RESSOURCE_UPDATE_REQUEST:
      return { loading: true }
    case RESSOURCE_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case RESSOURCE_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}

export const ressourceDeleteReducer = (state = { ressources: [] }, action) => {
  switch (action.type) {
    case RESSOURCE_DELETE_REQUEST:
      return { loading: true }
    case RESSOURCE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case RESSOURCE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}
