const Queue=require('./RMQConnection');
const log=require('./log');

async function PushRequest(params,callback)
{
  let response=null;
  //Getting the Cached Connection  
 //const connection=await Queue.getConnection();
  Queue.getMyConnection.then((connection)=>{
    connection.createChannel((error0,channel)=>{
    //Error Handling
    if(error0)return callback(error0,response);

    log.info(`Channel created for ${params.routingKey}`)

        /************************** Establishing QUEUE*********************** */
        channel.assertQueue('',{exclusive:true},(error3,q)=>{
            if(error3)
               return console.error(error3)
            console.info(`Waiting for Response in Que [${q.queue}]`)

            /********************** MicroService Response***********************/
            channel.consume(q.queue,(msg)=>{
              
              if (msg.properties.correlationId == params.requestID)
                console.info(`${params.routingKey}RPS RECIEVER: ${msg.content.toString()}`);
                channel.ack(msg);
                return callback(null,JSON.parse(msg.content.toString()));
            })

            //******************** PUBLISHER EVENT **************************/
            channel.assertExchange(params.exchange,'topic',{durable:false});
            channel.publish(params.exchange,params.routingKey,Buffer.from(params.data.toString()),{ 
              correlationId: params.requestID, 
              replyTo: q.queue 
            })
            
        })
    
    
  })
  }).catch((error)=>{
    log.error(error);
  })

  
}
async function PullRequest(params,onRequest){

  let response=null;
  //Getting the Cached Connection  
 // const connection=await Queue.getConnection();
 Queue.getMyConnection.then((connection)=>{
connection.createChannel((error0,channel)=>{
    //Error Handling
    if(error0)return callback(error0,response);

    log.info(`Channel created for ${params.routingKey}`)

       //For Reciever 1
        channel.assertQueue('',{exclusive:true},(error3,q)=>{
            if(error3)
               return console.error(error3)
            console.info(`Waiting for Requests in Que [${q.queue}]`)
            channel.bindQueue(q.queue,params.exchange,params.routingKey);
            channel.consume(q.queue,(msg)=>{
                console.info(`Recieved :rID:${msg.properties.correlationId}`);
                channel.ack(msg);
                onRequest(JSON.parse(msg.content.toString()),(result)=>{
                     console.log('ID:'+msg.properties.correlationId+' replyTo:'+msg.properties.replyTo)
                        channel.sendToQueue(msg.properties.replyTo,Buffer.from(JSON.stringify(result)), {
                        correlationId: msg.properties.correlationId
                        })
                })
                    
              
               
            })
            
        })
    
    
  })
 }).catch((error)=>{
   log.error(error);
 })

  
}
module.exports={
    PushRequest,PullRequest
}