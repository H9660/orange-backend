const express = require('express')
const router = express.Router()
const {
  getProblem,
  getProblems,
  setProblem,
  deleteProblem,
  deleteAllProblems,
  updateProblem,
  runCode,
  submitCode
} = require('../controllers/problemController')

router.route('/').get(getProblems).post(setProblem).delete(deleteAllProblems)
router.route('/:title').get(getProblem).delete(deleteProblem).put(updateProblem)
router.route('/run').post(runCode)
router.route('/submit').post(submitCode)
module.exports = router
