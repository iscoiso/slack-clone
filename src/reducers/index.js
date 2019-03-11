import { combineReducers } from 'redux'
import { SET_USER, CLEAR_USER, SET_CURRENT_CHANNEL } from '../actions/types'

const INITIAL_STATE_USER = {
  currentUser: null,
  isLoading: true
}

const user_reducer = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        isLoading: false
      }

    case CLEAR_USER:
      return { ...INITIAL_STATE_USER, isLoading: false }

    default:
      return state
  }
}

const INITIAL_STATE_CHANNEL = {
  currentChannel: null
}

const channel_reducer = (state = INITIAL_STATE_CHANNEL, action) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return { ...state, currentChannel: action.payload.currentChannel }
    default:
      return state
  }
}

export default combineReducers({
  user: user_reducer,
  channel: channel_reducer
})
