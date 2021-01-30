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
//Getting the connection [ caching the connection if it exists or create a new connection if it does not ]
async function getConnection()
{
    if(conn)
        return conn;
    else
    {
        amqp.connect(Url,(err,connection)=>{
        //If error Initiating Connection
        if(err)
        {
            console.error("[RabbitMQ] Error:"+err.message);
            return setTimeout(getConnection,1000)
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
        return conn;
        });
    }

}

module.exports.getConnection=getConnection;
module.exports.closeConnection=closeConnection;

