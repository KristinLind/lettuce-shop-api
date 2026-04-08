const {body, validationResult} = require('express-validator');

const listValidationRules = ( )=> {
    return [
        body('name').trim().notEmpty().withMessage('List name is required.'),
        body('user').optional().isMongoId().withMessage('Invalid User ID'),
        body('items').optional().isArray(),
        body('items.*').isMongoId().withMessage('Invalid Item ID')
    ];
};

const userValidationRules = () => {
    return [
        body('username').notEmpty().withMessage('Username is required.'),
        body('email').optional().isEmail().withMessage('Please provide a valid email address')
    ];
};

const itemValidationRules = () => {
    return [
        body('name').trim().notEmpty().withMessage('Item name is required.'),
        body('price').optional().isNumeric().withMessage('Price must be a number.'),
        body('quantity').optional().isNumeric().withMessage('Quantity must be a number.'),
        body('category').optional().trim(),
        body('store').optional().isMongoId().withMessage('Invalid Store ID format.'),
        body('list').optional().isMongoId().withMessage('Invalid List ID format.'),
        body('notes').optional().trim()
    ];
};

const storeValidationRules = () => {
    return [
        body('name').trim().notEmpty().withMessage('Store name is required.'),
        body('address').optional().trim(),
        body('category').optional().trim(),
        body('notes').optional().trim()
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({errors: errors.array()});
};



module.exports = {
    listValidationRules,
    userValidationRules,
    itemValidationRules,
    storeValidationRules,
    validate
};