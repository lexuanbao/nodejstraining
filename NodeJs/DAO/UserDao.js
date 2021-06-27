const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017';
var databaseHandler = require('../common/databaseHandler');
var dbHandler = new databaseHandler();

/**
 *Finding all of users in database
*/
async function findAllUser(req, res){
    try {
        await dbHandler.openConection();
        const cursor = await dbHandler.client.db('UserList').collection('user_list').find();
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
 *Update a user in database and return modifiedCount
*/
async function updateUser(req, res) {
    try {
        await dbHandler.openConection();
        //Lấy user từ request
        user = req.body;
        //Câu lệnh update
        const result = await dbHandler.client.db('UserList').collection('user_list').updateOne(
            {userId: parseInt(user.userId)}, {$set: {fullNane: user.fullNane, kanaName: user.kanaName, birthDay: user.birthDay}} );

        if (result.upsertedCount > 0) {
            console.log(`One document was inserted with the id ${result.upsertedId.userId}`);
        } else {
            console.log(`${result.matchedCount} document(s) matched the query criteria.`);
            console.log(`${result.modifiedCount} document(s) was/were updated.`);
        }
        //Trả res về client
        res.json(result.modifiedCount);
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

async function addNewUser(client, user) {
    const result = await client.db('UserList').collection('user_list').insertOne({userId: user.userId, fullNane: user.fullNane, kanaName: user.kanaName, birthDay: user.birthDay});
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return result.insertedCount;
}

async function deleteUserById(client, id) {
    const result = await client.db('UserList').collection('user_list').deleteOne({userId: id});
    console.log(`${result.deletedCount} document was deleted`);
    return result.deletedCount;
}

async function findUserById(client, id) {
    const result = await client.db('UserList').collection('user_list').findOne({userId: id});
    console.log(`${JSON.stringify(result)}`);
    return result;
}

var findAll = async function(res) {

    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        await client.connect();
        var result = await findAllUser(client);
        //Phải viết hàm send ở đây vì đang dùng async function
        await res.send(result);//Gửi 1 array nên phải dùng .send()
        
    } catch (error) {
        console.log(error);

    } finally {
        await client.close();
    }
}

var updateById = async function(req, res) {

    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        //Lấy user từ client
        let user = req.body;

        await client.connect();
        var result = await updateUser(client, user);
        //Phải viết hàm send ở đây vì đang dùng async function
        await res.send(JSON.stringify(result));
        
    } catch (error) {
        console.log(error);

    } finally {
        await client.close();
    }
}

var insertUser = async function (req, res){
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        let user = req.body;
        await client.connect();
        let result = await addNewUser(client, user);
        res.json(result);
    } catch (error) {
        console.log(error);

    } finally {
        await client.close()
    }
}

var deleteUser = async function (req, res){
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try{
        let id = parseInt(req.params.id);
        await client.connect();
        const result = await deleteUserById(client, id);
        res.json(result);
    } catch(error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

var findById = async function (req, res) {
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        await client.connect();
        let id = parseInt(req.params.id);
        const result = await findUserById(client, id);
        res.json(result);
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

module.exports = {findAllUser, updateUser, insertUser, deleteUser, findById};