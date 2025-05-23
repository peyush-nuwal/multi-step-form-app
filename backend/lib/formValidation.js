import { body } from 'express-validator'


const page1ValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('address1').notEmpty().withMessage('Address1 is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('zipcode').isPostalCode('any').withMessage('Valid zipcode is required'),
];


const page2ValidationRules = [
  body('formId').notEmpty().withMessage('formId is required'),
  body('school').custom((value, { req }) => {
    if (req.body.studying === true && !value) {
      throw new Error('school is required when studying is true');
    }
    return true;
  }),
  body('school')
    .if(body('studying').equals('true'))  // note: equals compares string, so be sure studying is string or cast accordingly
    .notEmpty()
    .withMessage('school is required when studying is true'),
];

const page3ValidationRules = [
  body('formId').notEmpty().withMessage('formId is required'),
  body('projects').isArray({ min: 1 }).withMessage('Projects array is required'),
  body('projects.*.name').notEmpty().withMessage('Each project must have a name'),
  body('projects.*.description').optional().isString(),
];



export { page1ValidationRules, page2ValidationRules, page3ValidationRules }
