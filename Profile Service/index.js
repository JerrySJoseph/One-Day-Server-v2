const Queue =require('../_commonUtils/RMQConnection')
const request=require('../_commonUtils/RequestHandler')

//Initialising Event Queues for inter-service communication
Queue.InitQueue(()=>{

    request.PullfromQueue('user_create_queue',(data,responseCallback)=>{
console.log("CREATING Profile for "+data)
responseCallback("DOne");
});
})

