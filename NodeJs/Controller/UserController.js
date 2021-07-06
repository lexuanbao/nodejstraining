const business = require('../Business/UserBussiness');

const findAllUser = business.findAllUserBussiness;
const updateUser = business.updateUserBussiness;
const addNewUser = business.addNewUserBussiness;
const deleteUserById = business.deleteUserByIdBussiness;
const findUserById = business.findUserByIdBussiness;
const findAdminByUserName = business.findAdminByUserNameBussiness;
const authenticateUser = business.authenticateUserBussiness;
module.exports = {
    findAllUser, updateUser, addNewUser, 
    deleteUserById, findUserById, findAdminByUserName,
    authenticateUser
};