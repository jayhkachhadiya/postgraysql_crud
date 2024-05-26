const express = require('express')
const router = express.Router()
const {savePatterns,getPatterns,updatePatterns,getAllCategory} = require('../controllers/category.js')


router.post('/', getPatterns)
router.post('/insertDetail', savePatterns)
router.patch('/updatePattern',updatePatterns)
router.get('/getAllCategory',getAllCategory)

module.exports = router; 