import axios from 'axios'
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
  RESSOURCE_ADMIN_REQUEST,
  RESSOURCE_ADMIN_SUCCESS,
  RESSOURCE_ADMIN_FAIL,
  RESSOURCE_CATEGORIE_REQUEST,
  RESSOURCE_CATEGORIE_SUCCESS,
  RESSOURCE_CATEGORIE_FAIL,
  RESSOURCE_RESERVATION_REQUEST,
  RESSOURCE_RESERVATION_SUCCESS,
  RESSOURCE_RESERVATION_FAIL,
} from '../constants/ressourceConstant'

export const listRessources = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESSOURCE_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/ressources/', config)
    dispatch({
      type: RESSOURCE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESSOURCE_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const listRessourcesByCat = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESSOURCE_CATEGORIE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/ressources/ressourceByCat', config)
    dispatch({
      type: RESSOURCE_CATEGORIE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESSOURCE_CATEGORIE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const AdminRessources = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESSOURCE_ADMIN_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/ressources/admin', config)
    dispatch({
      type: RESSOURCE_ADMIN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESSOURCE_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const createRessource =
  (nom, organisme, categorie, quantiteDispo) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESSOURCE_CREATE_REQUEST,
      })

      const ressourceData = {
        nom,
        organisme,
        categorie,
        quantiteDispo,
      }
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post('/ressources/create', ressourceData, config)
      dispatch({
        type: RESSOURCE_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: RESSOURCE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateRessource =
  (id, nom, organisme, categorie, quantiteDispo) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESSOURCE_UPDATE_REQUEST,
      })
      const ressourceUpdateData = {
        nom,
        organisme,
        categorie,
        quantiteDispo,
      }
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.put(`/ressources/${id}`, ressourceUpdateData, config)

      dispatch({
        type: RESSOURCE_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message ? error.response.data.message : error.message
      dispatch({
        type: RESSOURCE_UPDATE_FAIL,
        payload: message,
      })
    }
  }

export const deleteRessource = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESSOURCE_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/ressources/delete/${id}`, config)
    dispatch({
      type: RESSOURCE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({
      type: RESSOURCE_DELETE_FAIL,
      payload: message,
    })
  }
}

export const stateRessource = () => async dispatch => {
  dispatch({
    type: RESSOURCE_STATE_REQUEST,
  })
}
