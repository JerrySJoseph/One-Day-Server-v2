//Importing Libraries
const express=require('express');
const Queue=require('../_commonUtils/RMQConnection')

//Importing Routers
const profileRouter=require('./Routes/profileRouter');
const chatRouter=require('./Routes/chatRouter');
const creditRouter=require('./Routes/creditRouter');
const matchRouter=require('./Routes/matchRouter');
const { isAuthorized } = require('./Utils/Authorization');

//Initialising Express Server
const app=express();

//Defininng port for API Gateway
const PORT= process.env.PORT | 3000

//Initialising Event Queues for inter-service communication
Queue.InitQueue((some)=>{
if(some.success)
        console.log("Queue Connected")
    else
        console.log("Error Connection to QUEUE")
})

//Current Version of the API
const version='v2'

//Routes
app.use(`/api/${version}/profile`,isAuthorized,profileRouter)
app.use(`/api/${version}/chat`,isAuthorized,chatRouter)
app.use(`/api/${version}/credit`,isAuthorized,creditRouter)
app.use(`/api/${version}/match`,isAuthorized,matchRouter)

//Listening to PORT for requests
app.listen(PORT,(err)=>console.log("One Day Application has started in PORT:"+PORT))