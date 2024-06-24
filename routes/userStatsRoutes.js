const express = require('express')
const router = express.Router()
const {
  getStats,
  updateStats,
  createStats
} = require('../controllers/userStatsController')
// we need to protect the middle ware thats why we are adding the middel ware here
// const { protect } = require('../middleware/authMiddleware')

router.route('/:userId').get(getStats).put(updateStats)
router.route('/').post(createStats)

module.exports = router
