import {
  GET_USER,
  UPLOAD_PICTURE,
  UPDATE_BIO,
  UPDATE_FIRSTNAME,
  UPDATE_LASTNAME,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  DISABLED_ACCOUNT,
  ACTIVE_ACCOUNT,
} from '../actions/user.actions'

const initialState = {}

export default function useReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      }
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      }
    case UPDATE_FIRSTNAME:
      return {
        ...state,
        firstname: action.payload,
      }
    case UPDATE_LASTNAME:
      return {
        ...state,
        lastname: action.payload,
      }
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
    case DISABLED_ACCOUNT:
      return state.filter((user) => user._id !== action.payload.id)
    case ACTIVE_ACCOUNT:
      return state.filter((user) => user._id !== action.payload.id)
    default:
      return state
  }
}