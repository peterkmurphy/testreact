import { combineReducers } from 'redux'
import {
  SELECT_TIMEDIR, INVALIDATE_TIMEDIR,
  REQUEST_MEETUPS, RECEIVE_MEETUPS
} from '../actions'

const selectedTimedir = (state = 'upcoming', action) => {
  console.log("Test");
  switch (action.type) {
    case SELECT_TIMEDIR:
      return action.timedir
    default:
      return state
  }
}


const meetups = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_TIMEDIR:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_MEETUPS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_MEETUPS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.meetups,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const meetupsByTimedir = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_TIMEDIR:
    case RECEIVE_MEETUPS:
    case REQUEST_MEETUPS:
      return {
        ...state,
        [action.timedir]: meetups(state[action.timedir], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  meetupsByTimedir,
  selectedTimedir
})

export default rootReducer
