const MongoClient = require('mongodb').MongoClient;

var test = async function test1 (res){databaseHandler(findAllUser, res)};

async function databaseHandler(callBack, req, res){
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        await client.connect();
        var result = await callBack(client);
        await res.send(result);
        
    } catch (error) {
        console.log(error);

    } finally {
        await client.close();
    }
}
