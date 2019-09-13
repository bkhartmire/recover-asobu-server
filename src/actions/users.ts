import axios from 'axios'
import { apiUrl } from '../../environment.js'
import { print } from 'graphql'
import { loginQuery } from '../queries/users'
import { AsyncStorage } from 'react-native'

export const loginUser = (userEmail, userPassword) => {
  return async dispatch => {
    const res = await axios.post(`${apiUrl}/graphql`, {
      query: print(loginQuery),
      variables: {
        userEmail,
        userPassword
      }
    })
    const user = res.data.data.Login
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.last_name,
        profilePhoto: user.profile_photo
      })
    )
    dispatch({ type: 'SET_USER', user })
  }
}