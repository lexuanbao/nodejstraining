const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017';
const constant = require('../common/Constant');
const databaseHandler = require('../common/databaseHandler');
const dbHandler = new databaseHandler();

/**
 *Finding all of users in database | return array of all users
*/
async function findAllUserDao(){
    try {
        await dbHandler.openConection();
        //Tìm kiếm tất cả user không phải là admin
        const cursor = await dbHandler.client.db().collection('user_list').find({role: constant.UserRole});
        const results = await cursor.toArray();
        
        //In với mục đích là kiểm tra kết quả
        if(results.length > 0) {
            console.log('findAllUser(client) was executed successfully');
            results.forEach((result, i) => {
                console.log(`user ${i}: `);
                console.log(JSON.stringify(result));
            });
        
        } else {
            console.log("can't find anything");
        }
        //Trả về mảng tất cả user
        return results;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

/**
 *Update a user in database | return modifiedCount
 * @param {user} user 
*/
async function updateUserDao(user) {
    try {
        await dbHandler.openConection();
        
        //Update 1 user không phải admin
        const result = await dbHandler.client.db().collection('user_list').updateOne(
            {userId: parseInt(user.userId), role: constant.UserRole}, {$set: {fullNane: user.fullNane, kanaName: user.kanaName, birthDay: user.birthDay}} );

        if (result.upsertedCount > 0) {
            console.log(`One document was inserted with the id ${result.upsertedId.userId}`);
        } else {
            console.log(`${result.matchedCount} document(s) matched the query criteria.`);
            console.log(`${result.modifiedCount} document(s) was/were updated.`);
        }
        //Trả modifiedCount
        return result.modifiedCount;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

/**
 * Add a new user | return insertedCount
 * @param {user} user 
 */
async function addNewUserDao(user) {
    try {
        await dbHandler.openConection();
        
        //Câu lệnh insert 1 user không phải admin
        const result = await dbHandler.client.db().collection('user_list').insertOne({
            userId: parseInt(user.userId), fullNane: user.fullNane, kanaName: user.kanaName, birthDay: user.birthDay, role: constant.UserRole});
        console.log(`New listing created with the following id: ${result.insertedId}`);
        return result.insertedCount;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

/**
 * Delete a user | Return insertedCount
 * @param {id} id 
 */
async function deleteUserByIdDao(id) {
    try {
        await dbHandler.openConection();
        
        //câu lệnh delete user không phải admin
        const result = await dbHandler.client.db().collection('user_list').deleteOne({userId: id, role: constant.UserRole});
        console.log(`${result.deletedCount} document was deleted`);
        return result.deletedCount;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
    
}

/**
 * Find a user by id | Return found user
 * @param {id} id of user 
 */
async function findUserByIdDao(id) {
    try {
        await dbHandler.openConection();
        //Câu lệnh tìm kiếm user không phải admin
        const result = await dbHandler.client.db().collection('user_list').findOne({userId: id, role: constant.UserRole});
        console.log(`${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

/**
 * Find a admin user by id | Return found user
 * @param {_userName} userName of user 
 */
async function findAdminByUserNameDao(_userName){
    try {
        await dbHandler.openConection();
        //Câu lệnh tìm kiếm admin user
        const result = await dbHandler.client.db().collection('user_list').findOne({userName: _userName, role: constant.AdminRole})
        console.log(`${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

/**
 * Find a admin user by id | Return found user
 * @param {_userName} userName of user 
 */
 async function countAdminByUserNameDao(_userName){
    try {
        await dbHandler.openConection();
        //Câu lệnh tìm kiếm admin user
        const result = await dbHandler.client.db().collection('user_list').countDocuments({userName: _userName, role: constant.AdminRole})
        console.log(`${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

/**
 * Find a user by id | Return found user
 * @param {id} id of user 
 */
 async function countUserByIdDao(id) {
    try {
        await dbHandler.openConection();
        //Câu lệnh tìm kiếm user không phải admin
        const result = await dbHandler.client.db().collection('user_list').count({userId: id, role: constant.UserRole},);
        console.log(`${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

module.exports = {
    findAllUserDao, updateUserDao, addNewUserDao, deleteUserByIdDao, findUserByIdDao,
    findAdminByUserNameDao, countAdminByUserNameDao, countUserByIdDao
};