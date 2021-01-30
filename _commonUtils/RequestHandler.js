//Importing required libraries
const Queue =require('../_commonUtils/RMQConnection')
const {performance}=require('perf_hooks');
const ms = require('ms');


//RPC subscript for reponse queues
const rpc_subscript="_rpc"
let index=0;


//Function to Push Event to Queues with data and callback for reponse handling
function PushToQueue(QueueName,data,callback)
{
    Queue.getQueue().createChannel(function(error1, channel) {
    if (error1) {
      callback(error1,null);
    }
    
   channel.assertQueue(QueueName, {
      durable: false
    });
    channel.assertQueue(QueueName+rpc_subscript, {
      durable: false
    });
    var uuid=generateUUID();
    console.log("CoID:"+uuid)
    channel.consume(QueueName+rpc_subscript, function(msg) {
        console.log('push-consumed');
        console.log("CoID:"+uuid)
         console.log("CoID:"+uuid)
          console.log("CoID:"+uuid)
        console.log("CoID:"+msg.properties.correlationId)
        if (msg.properties.correlationId.toString() === uuid) {
          console.log(' [R-handler] Recieved: %s', msg.content.toString());
          callback(null,JSON.parse(msg.content.toString()))
        }
      }, {
        noAck: true
      });
    console.log("CoID Before:"+uuid)
    channel.sendToQueue(QueueName, Buffer.from(JSON.stringify(data)),{
          correlationId: uuid, 
          replyTo: QueueName+rpc_subscript
    });
    
    console.log(`[R-handler] Profile Event Pushed-> ${QueueName}: data->${data._id}`);
    
  })
}

//Function to Pull Event from Queues with data process the Data then fire a callback within process callback
function PullfromQueue(QueueName,process)
{
    
     Queue.getQueue().createChannel(function(error1, channel) {
        if (error1) {
        throw error1;
        }
    
        channel.assertQueue(QueueName, {
            durable: false
            });    

        channel.consume(QueueName, function(msg) {
            
            console.log(" [R-handler-Pull] Received :%s", msg.content.toString());
            process(JSON.parse(msg.content),(response)=>{

                    channel.sendToQueue(msg.properties.replyTo,Buffer.from(JSON.stringify(msg)),{
                    correlationId: msg.properties.correlationId
        })
       
            });
          
          
            }, {
                noAck: true
            }); 
        
    });
}
function generateUUID() { 
    index++;
    return 'coID_'+index.toString();// Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

module.exports.PushToQueue=PushToQueue;
module.exports.PullfromQueue=PullfromQueue;