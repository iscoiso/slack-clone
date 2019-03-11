import { SET_USER, CLEAR_USER, SET_CURRENT_CHANNEL } from './types'

// user actions
export const setUser = user => ({
  type: SET_USER,
  payload: {
    currentUser: user
  }
})

export const clearUser = () => ({
  type: CLEAR_USER
})

// channel actions
export const setCurrentChannel = channel => ({
  type: SET_CURRENT_CHANNEL,
  payload: {
    currentChannel: channel
  }
})
