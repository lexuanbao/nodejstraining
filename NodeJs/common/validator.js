const validator = require('express-validator')
const userDao = require('../DAO/UserDao')

//common validate array for user
const validateUserCommon = [
    validator.body('fullNane', 'fullNane must not be empty').exists().bail().trim().notEmpty(),
    validator.body('kanaName', 'kanaName must not be empty').exists().bail().trim().notEmpty(),
    validator.body('birthDay', 'birthDay must not be empty').exists().bail().trim().notEmpty().bail()
             .isDate('dd/mm/yyyy').withMessage('birthDay formated dd/mm/yyyy'),
]

/**
 * Validate for user
 * @returns array of errors
 */
exports.validateAddUser = () => {
/*  Exits() sẽ check undefined, 
    Bail() sẽ dừng validate hàm tiếp theo nếu hàm trước ko pass
    withMessage() sẽ trả về mảng lỗi nếu hàm trước ko pass
    trim() là santizer xử lí value truyền vào 
*/
    return [
        validator.check('userId', `userId must not be empty`).exists().bail().notEmpty().bail()
                 .isNumeric().withMessage(`userId must be a number`),
        validator.check('userId').exists().bail().trim().escape().custom(async value => {
                user = await userDao.findUserByIdDao(parseInt(value));
                    if(user) {
                        throw new Error('userId already exists');
                    } else {
                        return user
                    }
                })
        // validator.body('phone').optional().isInt(),
        // validator.body('status').optional().ivclsIn(['enabled', 'disabled'])
    ].concat(validateUserCommon);   
}

exports.validateEditUser = () => {
    return validateUserCommon;
}