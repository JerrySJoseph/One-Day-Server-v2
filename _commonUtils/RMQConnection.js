//Importing requried libraries
const amqp=require('amqplib/callback_api');
//url for RabbitMQ Server
const Url='amqp://localhost'

//Connection Object
let conn;

//Method to Init Queue instance
function InitQueue(callback)
{
    amqp.connect(Url,(err,connection)=>{
        if(err)
            callback({
                success:false,
                error:err
            })
        else
           {
            conn=connection;
           callback({
                success:true,
                connection:connection
            })
           } 

})
}

//Method to existing Queue Instance
function getQueue()
{
    return conn;
}
//Closing the Queue Connection
function closeQueue()
{
    conn.close();
}

module.exports.InitQueue=InitQueue;
module.exports.getQueue=getQueue;
module.exports.closeQueue=closeQueue;

