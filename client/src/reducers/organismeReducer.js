import {
  ORGANISME_LIST_REQUEST,
  ORGANISME_LIST_SUCCESS,
  ORGANISME_LIST_FAIL,
  ORGANISME_CREATE_REQUEST,
  ORGANISME_CREATE_SUCCESS,
  ORGANISME_CREATE_FAIL,
  ORGANISME_UPDATE_REQUEST,
  ORGANISME_UPDATE_SUCCESS,
  ORGANISME_UPDATE_FAIL,
  ORGANISME_DELETE_REQUEST,
  ORGANISME_DELETE_SUCCESS,
  ORGANISME_DELETE_FAIL,
  ORGANISME_REGISTER_REQUEST,
  ORGANISME_REGISTER_SUCCESS,
  ORGANISME_REGISTER_FAIL,
  ORGANISME_STATE_REQUEST,
} from '../constants/organismeConstant'
export const organismeListReducer = (state = { organismes: [] }, action) => {
  switch (action.type) {
    case ORGANISME_LIST_REQUEST:
      return { loading: true }
    case ORGANISME_LIST_SUCCESS:
      return { loading: false, organismes: action.payload }
    case ORGANISME_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const organismeRegisterReducer = (state = { organisme: [] }, action) => {
  switch (action.type) {
    case ORGANISME_REGISTER_REQUEST:
      return { loading: true }
    case ORGANISME_REGISTER_SUCCESS:
      return { loading: false, organismeReg: action.payload }
    case ORGANISME_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const organismeCreateReducer = (state = { organismes: [] }, action) => {
  switch (action.type) {
    case ORGANISME_CREATE_REQUEST:
      return { loading: true }
    case ORGANISME_CREATE_SUCCESS:
      return { loading: false, success: true }
    case ORGANISME_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ORGANISME_STATE_REQUEST:
      return { success: false }
    default:
      return state
  }
}

export const organismeUpdateReducer = (state = { organismes: [] }, action) => {
  switch (action.type) {
    case ORGANISME_UPDATE_REQUEST:
      return { loading: true }
    case ORGANISME_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case ORGANISME_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }
    case ORGANISME_STATE_REQUEST:
      return { success: false }
    default:
      return state
  }
}

export const organismeDeleteReducer = (state = { organismes: [] }, action) => {
  switch (action.type) {
    case ORGANISME_DELETE_REQUEST:
      return { loading: true }
    case ORGANISME_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ORGANISME_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}
