const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017';
var databaseHandler = require('../common/databaseHandler');
var dbHandler = new databaseHandler();
const { validationResult } = require('express-validator');

/**
 *Finding all of users in database | send a response of user array
*/
async function findAllUser(req, res){
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
            results = JSON.stringify(results.length);
            console.log("can't find anything");
        }
        //Gửi kết quả sang results
        res.send(results);
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

/**
 *Update a user in database send a message to client
*/
async function updateUser(req, res) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return;
        }

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
        //Trả res về client
        res.json(result.modifiedCount  + ' record(s) updated');
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

/**
 * Add a new user send a message to client
 * @param {req} req 
 * @param {res} res 
 */
async function addNewUser(req, res) {
    try {
        await dbHandler.openConection();
        //Lấy user từ request
        user = req.body
        //Câu lệnh insert
        const result = await dbHandler.client.db().collection('user_list').insertOne({userId: user.userId, fullNane: user.fullNane, kanaName: user.kanaName, birthDay: user.birthDay});
        console.log(`New listing created with the following id: ${result.insertedId}`);
        res.json(result.insertedCount + ' record(s) inserted');
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

/**
 * Delete a user | Return insertedCount
 * @param {req} req 
 * @param {res} res 
 */
async function deleteUserById(req, res) {
    try {
        await dbHandler.openConection();
        //Lấy userid từ request
        id = parseInt(req.params.id);
        //câu lệnh delete
        const result = await dbHandler.client.db().collection('user_list').deleteOne({userId: id});
        console.log(`${result.deletedCount} document was deleted`);
        res.json(result.deletedCount  + ' record(s) deleted');
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
    
}

/**
 * Find a user by id | Return finded user
 * @param {req} req 
 * @param {res} res 
 */
async function findUserById(req, res) {
    try {
        await dbHandler.openConection();
        //Lấy id từ request
        id = parseInt(req.params.id);
        //Câu lệnh tìm kiếm
        const result = await dbHandler.client.db('UserList').collection('user_list').findOne({userId: id});
        console.log(`${JSON.stringify(result)}`);
        res.json(result);
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

module.exports = {findAllUser, updateUser, addNewUser, deleteUserById, findUserById};