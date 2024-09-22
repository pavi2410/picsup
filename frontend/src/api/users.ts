import ky from 'ky';
import { AUTH_HOST, USERS_HOST } from './config';

export function userProfile() {
  return ky.post(USERS_HOST + '/profile', { credentials: 'include' });
}

export function signupUser({ email, password, username }) {
  return ky.post(AUTH_HOST + '/signup', {
    credentials: 'include',
    json: {
      email, password, username
    }
  });
}

export function loginUser({ email, password }) {
  return ky.post(AUTH_HOST + '/login', {
    credentials: 'include',
    json: {
      email, password
    }
  });
}
