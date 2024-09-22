import ky from 'ky'
import { IMAGES_HOST } from './config'

export function getAllImages() {
  return ky.get(IMAGES_HOST + '/public', { credentials: 'include' }).json<{ images: number[] }>()
}

export function getImageById(imageId) {
  return IMAGES_HOST + '/public/' + imageId
}

export function uploadImage(imageData: FormData) {
  return ky.post(IMAGES_HOST, {
    credentials: 'include',
    body: imageData
  }).json<{ id: number }>()
}

export function deleteImageById(imageId) {
  return ky.delete(IMAGES_HOST + '/' + imageId, { credentials: 'include' })
}


export function getAllOwnerImages() {
  return ky.get(IMAGES_HOST, { credentials: 'include' }).json<{ images: number[] }>()
}

export function getOwnerImageById(ownerId) {
  return IMAGES_HOST + '/' + ownerId
}
