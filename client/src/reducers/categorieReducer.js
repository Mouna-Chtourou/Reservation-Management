import {
  CATEGORIE_LIST_REQUEST,
  CATEGORIE_LIST_SUCCESS,
  CATEGORIE_LIST_FAIL,
  CATEGORIE_CREATE_REQUEST,
  CATEGORIE_CREATE_SUCCESS,
  CATEGORIE_CREATE_FAIL,
  CATEGORIE_UPDATE_REQUEST,
  CATEGORIE_UPDATE_SUCCESS,
  CATEGORIE_UPDATE_FAIL,
  CATEGORIE_DELETE_REQUEST,
  CATEGORIE_DELETE_SUCCESS,
  CATEGORIE_DELETE_FAIL,
  CATEGORIE_ID_REQUEST,
  CATEGORIE_ID_SUCCESS,
  CATEGORIE_ID_FAIL,
  CATEGORIE_STATE_REQUEST,
} from '../constants/categorieConstant'

export const categorieListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORIE_LIST_REQUEST:
      return { loading: true }
    case CATEGORIE_LIST_SUCCESS:
      return { loading: false, categories: action.payload }
    case CATEGORIE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categorieIdReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORIE_ID_REQUEST:
      return { loading: true }
    case CATEGORIE_ID_SUCCESS:
      return { loading: false, categories: action.payload }
    case CATEGORIE_ID_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categorieCreateReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORIE_CREATE_REQUEST:
      return { loading: true }
    case CATEGORIE_CREATE_SUCCESS:
      return { loading: false, success: true }
    case CATEGORIE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CATEGORIE_STATE_REQUEST:
      return { success: false }
    default:
      return state
  }
}

export const categorieUpdateReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORIE_UPDATE_REQUEST:
      return { loading: true }
    case CATEGORIE_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case CATEGORIE_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}

export const categorieDeleteReducer = (state = { categorie: [] }, action) => {
  switch (action.type) {
    case CATEGORIE_DELETE_REQUEST:
      return { loading: true }
    case CATEGORIE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CATEGORIE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}
