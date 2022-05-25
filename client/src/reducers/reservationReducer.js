import {
  RESERVATION_CREATE_REQUEST,
  RESERVATION_CREATE_SUCCESS,
  RESERVATION_CREATE_FAIL,
  RESERVATION_LIST_REQUEST,
  RESERVATION_LIST_SUCCESS,
  RESERVATION_LIST_FAIL,
  RESERVATION_DELETE_REQUEST,
  RESERVATION_DELETE_SUCCESS,
  RESERVATION_DELETE_FAIL,
  RESERVATION_ACCEPT_REQUEST,
  RESERVATION_ACCEPT_SUCCESS,
  RESERVATION_ACCEPT_FAIL,
  RESERVATION_UPDATE_REQUEST,
  RESERVATION_UPDATE_SUCCESS,
  RESERVATION_UPDATE_FAIL,
  RESERVATION_LIBERER_REQUEST,
  RESERVATION_LIBERER_SUCCESS,
  RESERVATION_LIBERER_FAIL,
  RESERVATION_DISPONIBILITE_REQUEST,
  RESERVATION_DISPONIBILITE_SUCCESS,
  RESERVATION_DISPONIBILITE_FAIL,
  RESERVATION_STATE_REQUEST,
} from '../constants/reservationConstant'
export const reservationCreateReducer = (state = { reservations: [] }, action) => {
  switch (action.type) {
    case RESERVATION_CREATE_REQUEST:
      return { loading: true }
    case RESERVATION_CREATE_SUCCESS:
      return { loading: false, success: true }
    case RESERVATION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case RESERVATION_STATE_REQUEST:
      return { success: false }
    default:
      return state
  }
}

export const reservationListReducer = (state = { reservations: [] }, action) => {
  switch (action.type) {
    case RESERVATION_LIST_REQUEST:
      return { loading: true }
    case RESERVATION_LIST_SUCCESS:
      return { loading: false, reservations: action.payload }
    case RESERVATION_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const reservationDispoReducer = (state = { reservation: [] }, action) => {
  switch (action.type) {
    case RESERVATION_DISPONIBILITE_REQUEST:
      return { loading: true }
    case RESERVATION_DISPONIBILITE_SUCCESS:
      return { loading: false, reservation: action.payload }
    case RESERVATION_DISPONIBILITE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const reservationUpdateReducer = (state = { reservations: [] }, action) => {
  switch (action.type) {
    case RESERVATION_UPDATE_REQUEST:
      return { loading: true }
    case RESERVATION_UPDATE_SUCCESS:
      return { loading: false, success: true, }
    case RESERVATION_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}

export const reservationDeleteReducer = (state = { reservations: [] }, action) => {
  switch (action.type) {
    case RESERVATION_DELETE_REQUEST:
      return { loading: true }
    case RESERVATION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case RESERVATION_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}

export const reservationLibererReducer = (state = { reservations: [] }, action) => {
  switch (action.type) {
    case RESERVATION_LIBERER_REQUEST:
      return { loading: true }
    case RESERVATION_LIBERER_SUCCESS:
      return { loading: false, success: true }
    case RESERVATION_LIBERER_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}

export const reservationAcceptReducer = (state = { reservations: [] }, action) => {
  switch (action.type) {
    case RESERVATION_ACCEPT_REQUEST:
      return { loading: true }
    case RESERVATION_ACCEPT_SUCCESS:
      return { loading: false, success: true }
    case RESERVATION_ACCEPT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
