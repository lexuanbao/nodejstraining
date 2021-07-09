const validator = require('express-validator')
const userDao = require('../DAO/UserDao')
var userAdmin;

//common validate array for user
const validateUserCommon = [
    validator.body('fullNane', 'fullNane must not be empty').exists().bail().trim().notEmpty(),
    validator.body('kanaName', 'kanaName must not be empty').exists().bail().trim().notEmpty(),
    validator.body('birthDay', 'birthDay must not be empty').exists().bail().trim().notEmpty().bail()
             .isDate('dd/mm/yyyy').withMessage('birthDay formated dd/mm/yyyy'),
]

/**
 * Validate for regular user
 * @returns array of errors
 */
exports.validateAddUser = () => {
/*  Exits() sẽ check undefined, 
    Bail() sẽ dừng validate hàm tiếp theo nếu hàm trước ko pass
    withMessage() sẽ trả về mảng lỗi nếu hàm trước ko pass
    trim() là santizer xử lí value truyền vào 
*/
    return [
        validator.check('userId', 'userId must not be empty').trim().escape().exists().bail()
                 .notEmpty().bail().isNumeric().withMessage('userId must be a number')
                 .custom(async value => {
                    user = await userDao.findUserByIdDao(parseInt(value));
                        if(user) {
                            throw new Error('userId already exists');
                        }
                    })
        // validator.body('phone').optional().isInt(),
        // validator.body('status').optional().ivclsIn(['enabled', 'disabled'])
    ].concat(validateUserCommon);   
}

exports.validateEditUser = () => {
    return validateUserCommon;
}
/**
 * Validate AdminUser when login
 * @returns array of errors
 */
exports.validateLoginUser = () => {
    return [
        validator.check('userName', 'userName must not be empty').exists().bail().trim().notEmpty().bail()
                 .custom(async value => {
                    userAdmin = await userDao.findAdminByUserNameDao(value);
                     if(!userAdmin){
                        throw new Error('Incorrect userName');
                     }
                 }),
        validator.check('password', 'password must not be empty').exists().bail().trim().notEmpty()
                .custom(async value => {
                    if(userAdmin.password != value){
                        throw new Error('Incorrect password');
                    }
                }),
        // validator.check('password', 'password must not be empty').exists().bail().trim().notEmpty().bail()
        // .equals(this.user.userName).withMessage('Incorrect password') -> không dùng được vì lúc gọi hàm thì giá trị user chưa có
    ]
}