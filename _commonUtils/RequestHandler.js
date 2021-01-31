const log=require('./log');

async function PushRequest(params,channel,callback)
{
  
/************************** Establishing QUEUE*********************** */
        channel.assertQueue('',{autoDelete:true},(error3,q)=>{
            if(error3)
               return callback(error3)
            console.info(`Waiting for Response in Que [${q.queue}]`)
            /********************** MicroService Response***********************/
            channel.consume(q.queue,(msg)=>{
              
              if (msg.properties.correlationId == params.requestID)
              {
                console.info(`${q.queue} RPS RECIEVER: ${msg.content.toString()}`);
                channel.ack(msg);
              
               channel.cancel(msg.fields.consumerTag);
                return callback(JSON.parse(msg.content.toString()));
              }
                
            })

            //******************** PUBLISHER EVENT **************************/
            channel.assertExchange(params.exchange,'topic',{durable:false});
            channel.publish(params.exchange,params.routingKey,Buffer.from(params.data.toString()),{ 
              correlationId: params.requestID, 
              replyTo: q.queue 
            })
            
        })
  
}
async function PullRequest(params,channel,onRequest){

  
 //For Reciever 1
        channel.assertQueue('',{autoDelete:true},(error3,q)=>{
            if(error3)
               return console.error(error3)
            let consumertag=null;
            console.info(`Waiting for Requests in Que [${q.queue}]`)
            channel.bindQueue(q.queue,params.exchange,params.routingKey);
            channel.consume(q.queue,(msg)=>{
                console.info(`Recieved :rID:${msg.properties.correlationId}`);
                channel.ack(msg);
               // channel.cancel(msg.fields.consumerTag)
              
                onRequest(JSON.parse(msg.content.toString()),(result)=>{
                     console.log('ID:'+msg.properties.correlationId+' replyTo:'+msg.properties.replyTo)
                        channel.sendToQueue(msg.properties.replyTo,Buffer.from(JSON.stringify(result)), {
                        correlationId: msg.properties.correlationId
                        })
                })
                    
              
               
            })
            
        })
  
}
module.exports={
    PushRequest,PullRequest
}