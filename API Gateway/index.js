//Importing Libraries
const express=require('express');
const Queue=require('../_commonUtils/RMQConnection')
const log=require('./Utils/log');

//Importing Routers
const profileRouter=require('./Routes/profileRouter');
const chatRouter=require('./Routes/chatRouter');
const creditRouter=require('./Routes/creditRouter');
const matchRouter=require('./Routes/matchRouter');
const { isAuthorized } = require('./Utils/Authorization');

//Initialising Express Server
const app=express();

//Initialising Queue for inter Service communications
Queue.getMyConnection
    .then(()=>log.info('GATEWAY QUEUE STARTED'))
    .catch((err)=>log.error(err))

//Defininng port for API Gateway
const PORT= process.env.PORT | 3000

//Current Version of the API
const version='v2'

app.use(express.json())
//Routes
//TODO: Add authorized Middleware before deploying to production
app.use(`/api/${version}/profile`,profileRouter)
app.use(`/api/${version}/chat`,isAuthorized,chatRouter)
app.use(`/api/${version}/credit`,isAuthorized,creditRouter)
app.use(`/api/${version}/match`,isAuthorized,matchRouter)

//Listening to PORT for requests
app.listen(PORT,(err)=>log.entry("Application has started in PORT:"+PORT))