import {
  SALLE_LIST_REQUEST,
  SALLE_LIST_SUCCESS,
  SALLE_LIST_FAIL,
  SALLE_CREATE_REQUEST,
  SALLE_CREATE_SUCCESS,
  SALLE_CREATE_FAIL,
  SALLE_UPDATE_REQUEST,
  SALLE_UPDATE_SUCCESS,
  SALLE_UPDATE_FAIL,
  SALLE_DELETE_REQUEST,
  SALLE_DELETE_SUCCESS,
  SALLE_DELETE_FAIL,
  SALLE_STATE_REQUEST,
} from '../constants/salleConstant'

export const salleListReducer = (state = { salles: [] }, action) => {
  switch (action.type) {
    case SALLE_LIST_REQUEST:
      return { loading: true }
    case SALLE_LIST_SUCCESS:
      return { loading: false, salles: action.payload }
    case SALLE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const salleCreateReducer = (state = { salles: [], success: null, error: '' }, action) => {
  switch (action.type) {
    case SALLE_CREATE_REQUEST:
      return { loading: true }
    case SALLE_CREATE_SUCCESS:
      return { loading: false, success: true }
    case SALLE_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false }
    case SALLE_STATE_REQUEST:
      return { success: false }
    default:
      return state
  }
}

export const salleUpdateReducer = (state = { salles: [] }, action) => {
  switch (action.type) {
    case SALLE_UPDATE_REQUEST:
      return { loading: true }
    case SALLE_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case SALLE_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }
    case SALLE_STATE_REQUEST:
      return { success: false }
    default:
      return state
  }
}

export const salleDeleteReducer = (state = { salles: [] }, action) => {
  switch (action.type) {
    case SALLE_DELETE_REQUEST:
      return { loading: true }
    case SALLE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case SALLE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}
