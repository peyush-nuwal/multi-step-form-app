import express from 'express'
import { page1, page2, page3, fullFormData } from '../controllers/formController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import { page1ValidationRules, page2ValidationRules, page3ValidationRules } from '../lib/formValidation.js';
import { dataValidatorMiddleware } from '../middleware/dataValidatorMiddleware.js';


const router = express.Router()

router.post('/page1', authMiddleware, page1ValidationRules, dataValidatorMiddleware, page1)
router.post('/page2', authMiddleware, page2ValidationRules, dataValidatorMiddleware, page2)
router.post('/page3', authMiddleware, page3ValidationRules, dataValidatorMiddleware, page3)
router.get('/all-data', authMiddleware, fullFormData)


export default router