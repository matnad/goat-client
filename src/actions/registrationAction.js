import axios from 'axios';
import {returnErrors} from './errorActions';
import {API_URL} from '../config'
import store from '../store'

import {
  STATUS_UPDATE,
  SEAT_UPDATE,
  PUSH_TOAST,
  BED_UPDATE,
} from './types';
import {tokenConfig} from "./authAction"

export const register = (status, days) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({status, days});
  axios
    .post(`${API_URL}/api/registration`, body, tokenConfig(getState))
    .then(res => {
      const {status, days, seat, bed} = res.data
      const oldRes = store.getState().auth.user.current_registration

      if (oldRes == null) {
        dispatch({
          type: PUSH_TOAST,
          payload: {
            title: "Registration erfolgreich",
            msg: "Wir haben deine Anmeldung für die GOAT LAN erhalten und freuen uns auf dich!"}
        })
      } else if (status !== oldRes.status) {
        const statusArray = ["", "definitiv", "provisorisch", "abgemeldet"]
        dispatch({
          type: PUSH_TOAST,
          payload: {
            title: "Status geändert",
            msg: `Dein Status wurde von ${statusArray[oldRes.status]} auf ${statusArray[status]} geändert.`}
        })
      } else if (days !== oldRes.days) {
        dispatch({
          type: PUSH_TOAST,
          payload: {
            title: "Status geändert",
            msg: `Deine Anmeldungsdetails wurden aktualisiert.`}
        })
      }
      if (seat !== oldRes.seat && seat == null) {
          dispatch({
            type: PUSH_TOAST,
            payload: {
              title: "Sitzreservation gelöscht",
              msg: `Deine Sitzreservation (Sitz ${oldRes.seat}) wurde gelöscht.`
            }
          })
      }
      if (bed !== oldRes.bed && bed === 0) {
        dispatch({
          type: PUSH_TOAST,
          payload: {
            title: "Bettreservation",
            msg: `Deine Bettreservation wurde gelöscht.`
          }
        })
      }
      dispatch({
        type: STATUS_UPDATE,
        payload: res.data
      })
      dispatch({
        type: SEAT_UPDATE,
        payload: seat
      })
      dispatch({
        type: BED_UPDATE,
        payload: bed
      })
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTRATION_FAIL')
      );
    });
};

export const updateSeat = (seat) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({seat});
  axios
    .post(`${API_URL}/api/registration/seat`, body, tokenConfig(getState))
    .then(res => {
      const newSeat = res.data.seat
      const oldSeat = store.getState().auth.user.current_registration.seat

      if (newSeat !== oldSeat) {
        if (newSeat == null) {
          dispatch({
            type: PUSH_TOAST,
            payload: {
              title: "Sitzreservation gelöscht",
              msg: `Deine Sitzreservation (Sitz ${oldSeat}) wurde gelöscht.`
            }
          })
        } else {
          dispatch({
            type: PUSH_TOAST,
            payload: {
              title: "Neue Sitzreservation",
              msg: `Sitz ${newSeat} wurde für dich reserviert!`
            }
          })
        }
      }

      dispatch({
        type: SEAT_UPDATE,
        payload: res.data.seat
      })
    })
    .catch(err => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, 'SEAT_UPDATE_FAIL')
      // );
      console.log(err)
      dispatch({
        type: PUSH_TOAST,
        payload: {
          title: "Technischer Fehler",
          msg: "Aufgrund eines technischen Fehlers konnte dein Sitz nicht reserviert werden. Bitte versuche es später nocheinmal."
        }
      })
    });
};

export const updateBed = (bed) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({bed});
  axios
    .post(`${API_URL}/api/registration/bed`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: PUSH_TOAST,
        payload: {
          title: "Bettreservation",
          msg: "Deine Bettreservation wurde aktualisiert!"
        }
      })
      dispatch({
        type: BED_UPDATE,
        payload: res.data.bed
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: PUSH_TOAST,
        payload: {
          title: "Technischer Fehler",
          msg: "Aufgrund eines technischen Fehlers konnte deine Bettreservation nicht aktualisiert werden. Bitte versuche es später nocheinmal."
        }
      })
    });
};
