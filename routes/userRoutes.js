const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  resetPassword,
  updateSolvedProblems
} = require('../controllers/userController')
// we need to protect the middle ware thats why we are adding the middel ware here
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/resetpassword', resetPassword)
router.get('/me', protect, getMe)
router.put('/', updateSolvedProblems)
module.exports = router
