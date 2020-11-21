import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'


router.post('/login', authUser)
router.post('/', registerUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


export default router;