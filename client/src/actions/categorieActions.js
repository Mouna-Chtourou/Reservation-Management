import axios from 'axios'
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

export const listCategories = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORIE_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/categories/', config)
    dispatch({
      type: CATEGORIE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORIE_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const idCategories = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORIE_ID_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/categories/categorie/${id}`, config)
    dispatch({
      type: CATEGORIE_ID_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORIE_ID_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const createCategorie = nom => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORIE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const catergorieData = {
      nom,
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/categories/create', catergorieData, config)
    dispatch({
      type: CATEGORIE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORIE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateCategorie = (id, nom) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORIE_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const catergorieData = {
      nom,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/categories/${id}`, catergorieData, config)

    dispatch({
      type: CATEGORIE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({
      type: CATEGORIE_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const deleteCategorie = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORIE_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/categories/delete/${id}`, config)
    dispatch({
      type: CATEGORIE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({
      type: CATEGORIE_DELETE_FAIL,
      payload: message,
    })
  }
}

export const stateCategorie = () => async dispatch => {
  dispatch({
    type: CATEGORIE_STATE_REQUEST,
  })
}
