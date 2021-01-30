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
        //If error Initiating Connection
        if(err)
        {
            console.error("[RabbitMQ] Error:"+err.message);
            return setTimeout(InitQueue,1000)
        }

        //On connection Error
        connection.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error(err);
            }
            });

        //On Connection Closed
        connection.on("close", function() {
            console.error("[RabbitMQ] reconnecting");
            return setTimeout(InitQueue, 1000);
            });
            
        //Assigning connection to export
        conn=connection;
        console.info("[RabbitMQ] connection succesfull")
        if(callback)
         callback(conn);
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

