import axios from 'axios'

const HOST = window.location.hostname === 'localhost' ? "http://localhost:4000/api" : '/api';
const USERS_HOST = HOST + "/users"

export function userProfile() {
  return axios.post(USERS_HOST + '/profile');
}

export function signupUser({ email, password, username }) {
  return axios.post(USERS_HOST + '/signup', {
    email, password, username
  });
}

export function loginUser({ email, password }) {
  return axios.post(USERS_HOST + '/login', {
    email, password
  });
}
