import express from 'express'
import { getAllImages, getImageById, uploadSingleFile, uploadImage, deleteImageById, getAllOwnerImages, getOwnerImageById } from './imageController.js'

const router = express.Router()

router.get('/images', getAllImages)
router.get('/image/:id', getImageById)
router.post('/upload', uploadSingleFile, uploadImage)
router.delete('/image/:id', deleteImageById)

router.get('/ownerimages', getAllOwnerImages)
router.get('/ownerimage/:id', getOwnerImageById)

export default router