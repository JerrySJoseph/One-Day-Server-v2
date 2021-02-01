
var mongoose = require('mongoose');
const dotenv=require('dotenv');

//Configuring dotenv for accessing Environment Variables
dotenv.config();

var matchdatabase=mongoose.createConnection(process.env.MATCH_DB_CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true});
const Init=function(callback){
    
    mongoose.connect(process.env.MATCH_DB_CONNECTION_STRING,
            {useNewUrlParser:true,useUnifiedTopology:true},
            (error)=>{
            callback(error)
        })
   
}

module.exports.Init=Init
module.exports.matchDatabase=matchdatabase

