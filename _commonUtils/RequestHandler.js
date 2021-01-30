const Queue=require('./RMQConnection');
const log=require('./log');

async function PushRequest(params,callback)
{
  let response=null;
  //Getting the Cached Connection  
  const connection=await Queue.getConnection();

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
                console.info(`Profile Reciever 1: ${msg.content.toString()}`);
                channel.ack(msg);
                return callback(null,msg);
            })

            //******************** PUBLISHER EVENT **************************/
            channel.assertExchange(params.exchange,'topic',{durable:false});
            channel.publish(params.exchange,params.routingKey,Buffer.from(params.data.toString()),{ 
              correlationId: params.requestID, 
              replyTo: q.queue 
            })
            
        })
    
    
  })
}
async function PullRequest(params,onRequest,onProcessed){

  let response=null;
  //Getting the Cached Connection  
  const connection=await Queue.getConnection();

  connection.createChannel((error0,channel)=>{
    //Error Handling
    if(error0)return callback(error0,response);

    log.info(`Channel created for ${params.routingKey}`)

       //For Reciever 1
        channel.assertQueue('',{exclusive:true},(error3,q)=>{
            if(error3)
               return console.error(error3)
            console.info(`Waiting for messaged in Que [${q.queue}]`)
            channel.bindQueue(q.queue,params.exchange,params.routingKey);
            channel.consume(q.queue,(msg)=>{
                console.info(`Recieved :${msg.content.toString()}`);
                channel.ack(msg);
                onRequest(msg,(error,result)=>{
                     console.log('ID:'+msg.properties.correlationId+' replyTo:'+msg.properties.replyTo)
                        channel.sendToQueue(msg.properties.replyTo,Buffer.from("RPC RESPONSE"), {
                        correlationId: msg.properties.correlationId
                        })
                })
                    
              
               
            })
            
        })
    
    
  })
}
module.exports={
    PushRequest,PullRequest
}