import { body } from 'express-validator'

const authValidationRules=[

    body("email").notEmpty().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required")
]



export { authValidationRules }