import express from 'express'
import {signUp,login } from '../controllers/authController.js'
import { authValidationRules } from "../lib/authValidation.js"
import { dataValidatorMiddleware } from '../middleware/dataValidatorMiddleware.js'

const router =express.Router()

router.post("/signup", authValidationRules, dataValidatorMiddleware,signUp)
router.post("/login", authValidationRules, dataValidatorMiddleware, login)

export default router