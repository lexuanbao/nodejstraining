const validator = require('express-validator')

exports.validate = () => {
    return [ 
        validator.check('userId', `userName doesn't exists`).isEmail(),
        // validator.body('email', 'Invalid email').exists().isEmail(),
        // validator.body('phone').optional().isInt(),
        // validator.body('status').optional().ivclsIn(['enabled', 'disabled'])
    ]   
}