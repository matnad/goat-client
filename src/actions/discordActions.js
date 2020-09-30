// Update User Info
import axios from "axios"
import {API_URL} from "../config"
import {tokenConfig} from "./authAction"
import {PUSH_TOAST} from "./types"

export const discordMessage = (message, rcpt = 'Organisationsteam') => (dispatch, getState) => {

  const body = JSON.stringify({message, rcpt});

  axios
    .post(`${API_URL}/api/discord/message`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: PUSH_TOAST,
        payload: {
          title: "Discord Nachricht",
          msg: res.data.msg
        }
      })
    })
    .catch(err => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: PUSH_TOAST,
        payload: {
          title: "Technischer Fehler",
          msg: "Aufgrund eines technischen Fehlers konnte die Nachricht nicht übermittelt werden. Bitte versuche es später nocheinmal."
        }
      })
    });
};
