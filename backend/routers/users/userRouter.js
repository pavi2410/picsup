import express from 'express'
import {profile, signup, login} from './userController.js'

const router = express.Router()

router.post('/profile', profile);
router.post('/signup', signup);
router.post('/login', login);

export default router