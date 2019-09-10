import {
  setUserName,
  setActiveView,
  setUser,
  toggleAuth,
  toggleResultsView,
  showProfile,
  closeProfile,
  getChats,
  getEvents
} from '../actions/userActions'

const initialState = {
  activeView: 'results',
  resultsSwitch: 'hangouts',
  username: '',
  user: {},
  allUsers: [],
  allEvents: [],
  chats: [],
  showProfile: false,
  currentProfile: {},
  isLoggedIn: false,
  showLogin: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME': {
      const copiedState = Object.assign({}, state)
      copiedState.username = action.username
      return copiedState
    }
    case 'SET_ACTIVE_VIEW': {
      const copiedState = Object.assign({}, state)
      copiedState.activeView = action.activeView
      return copiedState
    }
    case 'SET_ALL_USERS': {
      const copiedState = Object.assign({}, state)
      copiedState.allUsers = action.allUsers
      return copiedState
    }
    case 'SET_USER': {
      const copiedState = Object.assign({}, state)
      copiedState.user = Object.assign({}, action.user)
      copiedState.isLoggedIn = true
      return copiedState
    }
    case 'TOGGLE_AUTH': {
      const copiedState = Object.assign({}, state)
      copiedState.showLogin = !copiedState.showLogin
      return copiedState
    }
    case 'TOGGLE_RESULTS_VIEW': {
      const copiedState = Object.assign({}, state)
      copiedState.resultsSwitch = action.activeView
      return copiedState
    }
    case 'SHOW_PROFILE': {
      const copiedState = Object.assign({}, state)
      copiedState.currentProfile = Object.assign(
        copiedState.currentProfile,
        action.profile
      )
      copiedState.showProfile = true
      return copiedState
    }
    case 'CLOSE_PROFILE': {
      const copiedState = Object.assign({}, state)
      copiedState.currentProfile = Object.assign(copiedState.currentProfile, {})
      copiedState.showProfile = false
      return copiedState
    }
    case 'GET_CHATS': {
      const copiedState = Object.assign({}, state)
      copiedState.chats = [...action.chats]
      return copiedState
    }
    case 'GET_EVENTS': {
      const copiedState = Object.assign({}, state)
      copiedState.allEvents = action.events
      return copiedState
    }
    default: {
      return state
    }
  }
}

export { reducer, initialState }
