//Importing Required Libraries
const mongoose=require('mongoose');
const Profile=require('./Models/Profile')
const log=require('./Utils/log');
const Queue= require('../_commonUtils/RMQConnection')
const {PullRequest}=require('../_commonUtils/RequestHandler')
const {prepareProfileObject} = require('./Utils/ProfileHelper')


InitSystem();

//Init Entire Service System
function InitSystem()
{
//Connecting to Database
mongoose.connect('mongodb://localhost:27017/one_day_profiles_db',
    {useNewUrlParser:true,useUnifiedTopology:true},
    (error)=>{
        if(error)
            {
               log.error(error.message);
               log.entry('Attempting to Reconnect to Database');
               InitSystem();
            } 
        
        log.info('Connected to Database')
        //Register Events after Database Connection
        RegisterQueueEvents();
               
    })

}


//Registering Pull Requests for Queues
function RegisterQueueEvents()
{
    Queue.getMyConnection.then((connection)=>{
         connection.createChannel((err,channel)=>{
                PullRequest({exchange:'user',routingKey:'user.event.create'},channel,createEvent);
                PullRequest({exchange:'user',routingKey:'user.event.update'},channel,updateEvent);
                PullRequest({exchange:'user',routingKey:'user.event.delete'},channel,deleteEvent);
                log.info('Events Registered')  
         })
    })
     
}

const createEvent=(data,onFinish)=>{
     const userObject=prepareProfileObject(data);
            userObject.updateOne(userObject,{upsert:true},(err,result)=>{
                let response=null;
                if(err)
                    response={
                        success:false,
                        message:err.message
                    }
                else
                    response={
                        success:true,
                        message:'Profile Created Successfully'
                    }
            onFinish(response)
            })
}

const updateEvent=async (data,onFinish)=>{
    const user=await Profile.findOne({_id:data._id})
    if(user)
        Profile.updateOne({_id:data._id},data,(err,result)=>{
            let response=null;
            if(err)
                response={
                    success:false,
                    message:err.message
                }
            else
                response={
                    success:true,
                    message:'Profile Updated Successfully'
                }
            onFinish(response)
        })
    else
        onFinish(response={
                    success:false,
                    message:'No user with this ID exists'
                })
}

const deleteEvent=async(data,onFinish)=>{

    await Profile.deleteOne({_id:data._id})
    onFinish({data:data})
}