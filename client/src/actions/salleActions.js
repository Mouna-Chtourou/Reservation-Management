import axios from 'axios'
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

export const listSalles = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALLE_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/salles/', config)
    dispatch({
      type: SALLE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SALLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const createSalle = salle => async (dispatch, getState) => {
  try {
    dispatch({ type: SALLE_CREATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/salles/create', salle, config)

    dispatch({
      type: SALLE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SALLE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateSalle = (id, salle) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALLE_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/salles/${id}`, salle, config)
    dispatch({
      type: SALLE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({
      type: SALLE_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const deleteSalle = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALLE_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/salles/delete/${id}`, config)
    dispatch({
      type: SALLE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({
      type: SALLE_DELETE_FAIL,
      payload: message,
    })
  }
}

export const stateSalle = () => async dispatch => {
  dispatch({
    type: SALLE_STATE_REQUEST,
  })
}
