//Importing requried libraries
const amqp=require('amqplib/callback_api');
//url for RabbitMQ Server
const Url='amqp://localhost'

let conn=null;

//Closing the Queue Connection
function closeConnection()
{
    conn.close();
}
const getMyConnection=new Promise((resolve,reject)=>{
    if(conn)
        resolve(conn);
    else
    {
        amqp.connect(Url,(err,connection)=>{
        //If error Initiating Connection
        if(err)
        {
            console.error("[RabbitMQ] Error:"+err.message);
            reject(err);
        }

        //On connection Error
        connection.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[RabbitMQ] Error:"+err.message)
            }
            });

        //On Connection Closed
        connection.on("close", function() {
            console.error("[RabbitMQ] reconnecting");
            return setTimeout(getConnection, 1000);
            });
            
        //Assigning connection to export
        conn=connection;
        console.info("[RabbitMQ] connection succesfull")
        resolve(conn);
        });
    }
})


module.exports.closeConnection=closeConnection;
module.exports.getMyConnection=getMyConnection;

