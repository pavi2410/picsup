import axios from 'axios'
import { AUTH_HOST, USERS_HOST } from './config'

export function userProfile() {
  return axios.post(USERS_HOST + '/profile');
}

export function signupUser({ email, password, username }) {
  return axios.post(AUTH_HOST + '/signup', {
    email, password, username
  });
}

export function loginUser({ email, password }) {
  return axios.post(AUTH_HOST + '/login', {
    email, password
  });
}
