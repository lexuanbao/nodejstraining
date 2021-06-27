const uri = 'mongodb://localhost:27017';
const MongoClient = require('mongodb').MongoClient;

/**
*A class handles database connection 
*/
module.exports = function databaseHandler(){
this.client = new MongoClient(uri, {useUnifiedTopology: true})

    /**
    *Open database connection 
    */
    this.openConection = async function(){
        try {   
            await this.client.connect();
        } catch (error) {
            console.log(error);
        }
    }
    
    /**
    *Close database connection 
    */
    this.closeConnection = async function(){
        try {
            await this.client.close();
        } catch (error) {
            console.log(error);
        }
    }
} 


