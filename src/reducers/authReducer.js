import {
  AUTH_ERROR, BED_UPDATE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SEAT_UPDATE,
  STATUS_UPDATE,
  USER_LOADED,
  USER_LOADING
} from '../actions/types';


const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case STATUS_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          current_registration: {
            ...state.user.current_registration,
            status: action.payload.status,
            days: action.payload.days
          }
        }
      }
    case SEAT_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          current_registration: {
            ...state.user.current_registration,
            seat: action.payload
          }
        }
      }
    case BED_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          current_registration: {
            ...state.user.current_registration,
            bed: action.payload
          }
        }
      }
    default:
      return state;
  }
}
