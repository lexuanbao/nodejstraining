const userDao = require('../DAO/UserDao');

async function authenticateUserBussiness(userName, password){
    const user = await userDao.findAdminByUserNameDao(userName);
    if(user) {
        if(user.password == password){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const findAllUserBussiness = userDao.findAllUserDao;
const updateUserBussiness = userDao.updateUserDao;
const addNewUserBussiness = userDao.addNewUserDao;
const deleteUserByIdBussiness = userDao.deleteUserByIdDao;
const findUserByIdBussiness = userDao.findUserByIdDao;
const findAdminByUserNameBussiness = userDao.findAdminByUserNameDao;

module.exports = {
    findAllUserBussiness, updateUserBussiness, addNewUserBussiness, 
    deleteUserByIdBussiness, findUserByIdBussiness, findAdminByUserNameBussiness,
    authenticateUserBussiness
};