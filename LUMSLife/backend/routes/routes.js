import Router from 'express'

import * as generalController from '../controllers/generalController.js'
import * as studentController from '../controllers/studentController.js'
import * as societyController from '../controllers/societyController.js'

// creating the router
const router = Router()

//defining the functions to be called when a specific route is requested

router.post('/api/general/signup', generalController.signup)
router.post('/api/general/login', generalController.login)
router.post('/api/general/validateEmail', generalController.validateEmail)
export default router