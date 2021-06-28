const uri = 'mongodb://localhost:27017/UserList';
const MongoClient = require('mongodb').MongoClient;

/**
*A class handles database connection 
*/
module.exports = function databaseHandler(){
    /**
    *Open database connection 
    */
    this.openConection = async function(){
        this.client = new MongoClient(uri, {useUnifiedTopology: true})//Không thể dùng chung 1 kết nối để đóng mở => mỗi lần thực hiện truy vấn phải tạo riêng client
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


