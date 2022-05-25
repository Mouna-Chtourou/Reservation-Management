import axios from 'axios'
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

export const createReservation =
  (titre, salle, user, deDate, versDate, ressource) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESERVATION_CREATE_REQUEST,
      })

      const reservationData = {
        titre,
        salle,
        user,
        deDate,
        versDate,
        ressource,
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
      const { data } = await axios.post('/reservations/create', reservationData, config)

      dispatch({
        type: RESERVATION_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: RESERVATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const dispoReservation = (salle, deDate, versDate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESERVATION_DISPONIBILITE_REQUEST,
    })

    const reservationData = {
      salle,
      deDate,
      versDate,
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
    const { data } = await axios.post('/reservations/disponibilite', reservationData, config)

    dispatch({
      type: RESERVATION_DISPONIBILITE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESERVATION_DISPONIBILITE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const listReservations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESERVATION_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/reservations/', config)
    dispatch({
      type: RESERVATION_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESERVATION_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteReservation = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESERVATION_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/reservations/${id}`, config)
    dispatch({
      type: RESERVATION_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({
      type: RESERVATION_DELETE_FAIL,
      payload: message,
    })
  }
}

export const acceptReservation = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESERVATION_ACCEPT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const reservationData = { id }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/reservations/accept/${id}`, reservationData, config)

    dispatch({
      type: RESERVATION_ACCEPT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESERVATION_ACCEPT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateReservation =
  (id, titre, deDate, versDate, ressource) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESERVATION_UPDATE_REQUEST,
      })
      const reservationUpdateData = {
        titre,
        deDate,
        versDate,
        ressource,
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
      const { data } = await axios.put(`/reservations/${id}`, reservationUpdateData, config)

      dispatch({
        type: RESERVATION_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message ? error.response.data.message : error.message
      dispatch({
        type: RESERVATION_UPDATE_FAIL,
        payload: message,
      })
    }
  }

export const libererReservation = (id, versDate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESERVATION_LIBERER_REQUEST,
    })
    const reservationUpdateData = {
      versDate,
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
    const { data } = await axios.put(`/reservations/liberer/${id}`, reservationUpdateData, config)

    dispatch({
      type: RESERVATION_LIBERER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({
      type: RESERVATION_LIBERER_FAIL,
      payload: message,
    })
  }
}

export const stateReservation = () => async dispatch => {
  dispatch({
    type: RESERVATION_STATE_REQUEST,
  })
}
