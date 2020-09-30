// Check token & load user
import axios from "axios"
import {API_URL} from "../config"
import {
  ADMIN_COMMENT_SUCCESS,
  MEMBER_SUCCESS,
  PAID_SUCCESS,
  SEAT_SUCCESS,
  USERS_FAIL,
  USERS_LOADED,
  USERS_LOADING
} from "./types"
import {tokenConfig} from "./authAction"
import {returnErrors} from "./errorActions"

export const loadUsers = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USERS_LOADING });
  axios
    .get(`${API_URL}/api/admin/users`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USERS_LOADED,
        payload: res.data
      })
    })
    .catch(err => {
      if(err && err.response)
        dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({type: USERS_FAIL})
    });
};

export const changeMember = (id, member) => (dispatch, getState) => {
  const body = {id, member}
  axios
    .post(`${API_URL}/api/admin/users/member`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: MEMBER_SUCCESS,
        payload: {
          member: res.data.member,
          id: res.data.id
        }
      })
    })
    .catch(err => {
      if(err)
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err)
    });
}

export const changePaid = (id, paid) => (dispatch, getState) => {
  const body = {id, paid}
  axios
    .post(`${API_URL}/api/admin/users/paid`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: PAID_SUCCESS,
        payload: {
          paid: res.data.paid,
          id: res.data.id,
          regId: res.data.regId
        }
      })
    })
    .catch(err => {
      if(err)
        dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err)
    });
}

export const changeSeat = (id, seat) => (dispatch, getState) => {
  const body = {id, seat}
  axios
    .post(`${API_URL}/api/admin/users/seat`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SEAT_SUCCESS,
        payload: {
          seat: res.data.seat,
          id: res.data.id,
          regId: res.data.regId
        }
      })
    })
    .catch(err => {
      if(err)
        dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err)
    });
}

export const changeAdminComment = (id, adminComment) => (dispatch, getState) => {
  const body = {id, adminComment}
  axios
    .post(`${API_URL}/api/admin/users/admincomment`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADMIN_COMMENT_SUCCESS,
        payload: {
          adminComment: res.data.adminComment,
          id: res.data.id
        }
      })
    })
    .catch(err => {
      if(err)
        dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err)
    });
}
