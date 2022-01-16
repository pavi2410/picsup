import axios from 'axios'

const HOST = window.location.hostname === 'localhost' ? "http://localhost:4000/api" : '/api';
const IMAGES_HOST = HOST + "/images"

export function getAllImages() {
  return axios.get(IMAGES_HOST + '/images')
}

export function getImageById({ imageId }) {
  return axios.get(IMAGES_HOST + '/image/' + imageId)
}

export function uploadImage() {
  return axios.post(IMAGES_HOST + '/upload')
}

export function deleteImageById({ imageId }) {
  return axios.delete(IMAGES_HOST + '/image/' + imageId)
}


export function getAllOwnerImages() {
  return axios.get(IMAGES_HOST + '/ownerimages')
}

export function getOwnerImageById({ ownerId }) {
  return axios.get(IMAGES_HOST + '/ownerimage/' + ownerId)
}
