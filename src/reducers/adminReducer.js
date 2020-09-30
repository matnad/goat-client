import {
  ADMIN_COMMENT_SUCCESS,
  MEMBER_SUCCESS,
  PAID_SUCCESS,
  SEAT_SUCCESS,
  USERS_FAIL,
  USERS_LOADED,
  USERS_LOADING
} from "../actions/types"

import {CURRENT_LAN} from "../config"

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  users: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USERS_LOADED:
      // remap registrations
      let users = action.payload
      Object.values(users).forEach((user) => {
        user.registrations = user.registrations[0]
      })
      return {
        isAuthenticated: true,
        isLoading: false,
        users
      };
    case USERS_FAIL:
      return {
        isLoading: false,
        isAuthenticated: false,
        users: null
      }
    case PAID_SUCCESS:
      // deep-nested shit...
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: {
            ...state.users[action.payload.id],
            registrations : {
              ...state.users[action.payload.id].registrations,
              [CURRENT_LAN]: {
                ...state.users[action.payload.id].registrations[CURRENT_LAN],
                paid: action.payload.paid
              }
            }
          }
        }
      }
    case SEAT_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: {
            ...state.users[action.payload.id],
            registrations : {
              ...state.users[action.payload.id].registrations,
              [CURRENT_LAN]: {
                ...state.users[action.payload.id].registrations[CURRENT_LAN],
                seat: action.payload.seat
              }
            }
          }
        }
      }
    case MEMBER_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: {
            ...state.users[action.payload.id],
            member: action.payload.member
          }
        }
      }
    case ADMIN_COMMENT_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: {
            ...state.users[action.payload.id],
            adminComment: action.payload.adminComment
          }
        }
      }
    default:
      return state;
  }
}
