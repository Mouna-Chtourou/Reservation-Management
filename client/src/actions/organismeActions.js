import axios from 'axios'
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

export const listOrganismes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORGANISME_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/organismes/', config)
    dispatch({
      type: ORGANISME_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORGANISME_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const listOrganismeRegister = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORGANISME_REGISTER_REQUEST,
    })

    const { data } = await axios.get('/organismes/register')
    dispatch({
      type: ORGANISME_REGISTER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORGANISME_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const createOrganisme =
  (nom, representant, nbr_employe, telephone, fax) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORGANISME_CREATE_REQUEST,
      })

      const organismeData = {
        nom,
        representant,
        nbr_employe,
        telephone,
        fax,
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

      const { data } = await axios.post('/organismes/create', organismeData, config)
      dispatch({
        type: ORGANISME_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORGANISME_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateOrganisme =
  (id, nom, representant, nbr_employe, telephone, fax) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORGANISME_UPDATE_REQUEST,
      })
      const organismeUpdateData = {
        nom,
        representant,
        nbr_employe,
        telephone,
        fax,
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
      const { data } = await axios.put(`/organismes/${id}`, organismeUpdateData, config)

      dispatch({
        type: ORGANISME_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message ? error.response.data.message : error.message
      dispatch({
        type: ORGANISME_UPDATE_FAIL,
        payload: message,
      })
    }
  }

export const deleteOrganisme = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORGANISME_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/organismes/delete/${id}`, config)
    dispatch({
      type: ORGANISME_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({
      type: ORGANISME_DELETE_FAIL,
      payload: message,
    })
  }
}

export const stateOrganisme = () => async dispatch => {
  dispatch({
    type: ORGANISME_STATE_REQUEST,
  })
}
