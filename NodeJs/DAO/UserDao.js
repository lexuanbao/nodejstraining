const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017';
var databaseHandler = require('../common/databaseHandler');
var dbHandler = new databaseHandler();

/**
 *Finding all of users in database | return array of all users
 * @param {req} req 
*/
async function findAllUserDao(req){
    try {
        await dbHandler.openConection();
        const cursor = await dbHandler.client.db().collection('user_list').find();
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
 * @param {req} req 
*/
async function updateUserDao(req) {
    try {
        await dbHandler.openConection();
        //Lấy user từ request
        user = req.body;
        //Câu lệnh update
        const result = await dbHandler.client.db().collection('user_list').updateOne(
            {userId: parseInt(user.userId)}, {$set: {fullNane: user.fullNane, kanaName: user.kanaName, birthDay: user.birthDay}} );

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
 * @param {req} req 
 */
async function addNewUserDao(req) {
    try {
        await dbHandler.openConection();
        //Lấy user từ request
        user = req.body
        //Câu lệnh insert
        const result = await dbHandler.client.db().collection('user_list').insertOne({userId: parseInt(user.userId), fullNane: user.fullNane, kanaName: user.kanaName, birthDay: user.birthDay});
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
 * @param {req} req 
 */
async function deleteUserByIdDao(req) {
    try {
        await dbHandler.openConection();
        //Lấy userid từ request
        id = parseInt(req.params.id);
        //câu lệnh delete
        const result = await dbHandler.client.db().collection('user_list').deleteOne({userId: id});
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
        //Câu lệnh tìm kiếm
        const result = await dbHandler.client.db().collection('user_list').findOne({userId: id});
        console.log(`${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

async function findAdminByUserNameDao(_userName){
    try {
        await dbHandler.openConection();
        const result = await dbHandler.client.db().collection('user_list').findOne({userName: _userName, Role: 1})
        console.log(`${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}


module.exports = {findAllUserDao, updateUserDao, addNewUserDao, deleteUserByIdDao, findUserByIdDao, findAdminByUserNameDao};