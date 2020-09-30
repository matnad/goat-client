import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import adminReducer from "./adminReducer"
import modalReducer from "./modalReducer"
import toastReducer from "./toastReducer"

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  admin: adminReducer,
  modal: modalReducer,
  toasts: toastReducer
});
