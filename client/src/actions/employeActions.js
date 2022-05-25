import axios from 'axios'
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

export const listEmployes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYE_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/employes/', config)
    dispatch({
      type: EMPLOYE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EMPLOYE_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const demandeEmployes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYE_DEMANDE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/employes/demandes', config)
    dispatch({
      type: EMPLOYE_DEMANDE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EMPLOYE_DEMANDE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
export const deleteEmploye = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/employes/delete/${id}`, config)
    dispatch({
      type: EMPLOYE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({
      type: EMPLOYE_DELETE_FAIL,
      payload: message,
    })
  }
}
export const createEmploye =
  (nom, prenom, email, organisme, telephone, role) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EMPLOYE_CREATE_REQUEST,
      })

      const employeData = {
        nom,
        prenom,
        email,
        telephone,
        role,
        organisme,
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
      const { data } = await axios.post('/employes/', employeData, config)
      dispatch({
        type: EMPLOYE_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EMPLOYE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const acceptEmployes = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYE_ACCEPT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const employeData = { id }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/employes/accept/${id}`, employeData, config)

    dispatch({
      type: EMPLOYE_ACCEPT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EMPLOYE_ACCEPT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const desactiverEmployes = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYE_DESACTIVER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const employeData = { id }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/employes/desactiver/${id}`, employeData, config)

    dispatch({
      type: EMPLOYE_DESACTIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EMPLOYE_DESACTIVER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateEmploye = (id, email, organisme, role) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYE_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const employeData = { id, email, organisme, role }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/employes/modifier/${id}`, employeData, config)
    dispatch({
      type: EMPLOYE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EMPLOYE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const stateEmploye = () => async dispatch => {
  dispatch({
    type: EMPLOYE_STATE_REQUEST,
  })
}
