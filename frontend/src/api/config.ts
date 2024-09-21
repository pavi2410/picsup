export const AUTH_HOST = window.location.hostname === 'localhost' ? "http://localhost:4000/auth" : '/auth';
const API_HOST = window.location.hostname === 'localhost' ? "http://localhost:4000/api" : '/api';
export const USERS_HOST = API_HOST + "/users"
export const IMAGES_HOST = API_HOST + "/images"