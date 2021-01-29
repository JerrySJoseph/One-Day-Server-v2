const Queue =require('../_commonUtils/RMQConnection')
const {performance}=require('perf_hooks')
const rpc_subscript="_rpc"

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
    const uuid=generateUUID();
    channel.consume(QueueName+rpc_subscript, function(msg) {
        if (msg.properties.correlationId == uuid) {
          console.log(' [.] Got %s', msg.content.toString());
          callback(null,msg.content)
        }
      }, {
        noAck: true
      });
      
    channel.sendToQueue(QueueName, Buffer.from(JSON.stringify(data)),{
          correlationId: uuid, 
          replyTo: QueueName+rpc_subscript
    });
    console.log(`Profile Event Pushed-> ${QueueName}: data->${data.toString()}`);
    
  })
}
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
            
            console.log(" [x] Received %s", msg.content.toString());
            process(msg.content,(response)=>{

                    channel.sendToQueue(msg.properties.replyTo,Buffer.from(JSON.stringify(response)),{
                    correlationId: msg.properties.correlationId
        })
            });
          
          
            }, {
                noAck: true
            }); 
        
    });
}
function generateUUID() { // Public Domain/MIT
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