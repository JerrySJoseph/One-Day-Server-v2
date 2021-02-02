
var mongoose = require('mongoose');

let DB_URI="mongodb://localhost:27017/one_day_matches_db"
if(process.env.MATCH_DB_CONNECTION_STRING)
    DB_URI=process.env.MATCH_DB_CONNECTION_STRING
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

