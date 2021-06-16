const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';

//Tìm tất cả user
async function findAllUser(client) {
    const cursor = await client.db('UserList').collection('user_list').find();
    const results = await cursor.toArray();

    //In với mục đích là kiểm tra kết quả
    if(results.length > 0) {
        console.log('findAllUser(client) was executed successfully');
        results.forEach((result, i) => {
            console.log(`user ${i}: `);
            console.log(JSON.stringify(result));
        });
        //Trả về kết quả
        return results;
    } else {
        console.log("can't find anything");
    }
}

async function updateUser(client) {
    //const result = await client.db('UseRList').collection('user_list').updateOne({userId: user.userId}, {$set: user});
    const result = await client.db('UserList').collection('user_list').updateOne( {userId: 3}, {$set: {userId: 4}} );
    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId.userId}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}

//Export để dùng ở file khác
module.exports = async function userDao(res) {

    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        await client.connect();
        //var result = await findAllUser(client);
        var result = await updateUser(client)
        //Phải viết hàm send ở đây vì đang dùng async function
        await res.send(result);
        
    } catch (error) {
        console.log(error);

    } finally {
        await client.close();
    }
}


