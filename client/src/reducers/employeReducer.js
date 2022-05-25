import {
  EMPLOYE_LIST_REQUEST,
  EMPLOYE_LIST_SUCCESS,
  EMPLOYE_LIST_FAIL,
  EMPLOYE_DELETE_REQUEST,
  EMPLOYE_DELETE_SUCCESS,
  EMPLOYE_DELETE_FAIL,
  EMPLOYE_CREATE_REQUEST,
  EMPLOYE_CREATE_SUCCESS,
  EMPLOYE_CREATE_FAIL,
  EMPLOYE_DEMANDE_REQUEST,
  EMPLOYE_DEMANDE_SUCCESS,
  EMPLOYE_DEMANDE_FAIL,
  EMPLOYE_ACCEPT_REQUEST,
  EMPLOYE_ACCEPT_SUCCESS,
  EMPLOYE_ACCEPT_FAIL,
  EMPLOYE_DESACTIVER_REQUEST,
  EMPLOYE_DESACTIVER_SUCCESS,
  EMPLOYE_DESACTIVER_FAIL,
  EMPLOYE_UPDATE_REQUEST,
  EMPLOYE_UPDATE_SUCCESS,
  EMPLOYE_UPDATE_FAIL,
  EMPLOYE_STATE_REQUEST,
} from '../constants/employeConstant'

export const employeListReducer = (state = { employes: [] }, action) => {
  switch (action.type) {
    case EMPLOYE_LIST_REQUEST:
      return { loading: true }
    case EMPLOYE_LIST_SUCCESS:
      return { loading: false, employes: action.payload }
    case EMPLOYE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const employeDemandeReducer = (state = { employes: [] }, action) => {
  switch (action.type) {
    case EMPLOYE_DEMANDE_REQUEST:
      return { loading: true }
    case EMPLOYE_DEMANDE_SUCCESS:
      return { loading: false, employes: action.payload }
    case EMPLOYE_DEMANDE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const employeDeleteReducer = (state = { employes: [] }, action) => {
  switch (action.type) {
    case EMPLOYE_DELETE_REQUEST:
      return { loading: true }
    case EMPLOYE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case EMPLOYE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}

export const employeCreateReducer = (state = { employes: [] }, action) => {
  switch (action.type) {
    case EMPLOYE_CREATE_REQUEST:
      return { loading: true }
    case EMPLOYE_CREATE_SUCCESS:
      return { loading: false, success: true }
    case EMPLOYE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case EMPLOYE_STATE_REQUEST:
      return { success: false }
    default:
      return state
  }
}

export const employeAcceptReducer = (state = { employes: [] }, action) => {
  switch (action.type) {
    case EMPLOYE_ACCEPT_REQUEST:
      return { loading: true }
    case EMPLOYE_ACCEPT_SUCCESS:
      return { loading: false, success: true }
    case EMPLOYE_ACCEPT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const employeDesactiverReducer = (state = { employes: [] }, action) => {
  switch (action.type) {
    case EMPLOYE_DESACTIVER_REQUEST:
      return { loading: true }
    case EMPLOYE_DESACTIVER_SUCCESS:
      return { loading: false, success: true }
    case EMPLOYE_DESACTIVER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const employeUpdateReducer = (state = { employes: [] }, action) => {
  switch (action.type) {
    case EMPLOYE_UPDATE_REQUEST:
      return { loading: true }
    case EMPLOYE_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case EMPLOYE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
