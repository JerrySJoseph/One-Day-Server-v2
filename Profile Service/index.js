//Importing Required Libraries
const mongoose=require('mongoose');
const log=require('./Utils/log');
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
    PullRequest({exchange:'user',routingKey:'user.event.create'},createEvent);
    PullRequest({exchange:'user',routingKey:'user.event.update'},updateEvent);
    PullRequest({exchange:'user',routingKey:'user.event.delete'},deleteEvent);
    log.info('Events Registered')   
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

const updateEvent=(data,onFinish)=>{
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
                message:'Profile Updated Successfully'
            }
        onFinish(response)
    })
}

const deleteEvent=(data,onFinish)=>{
    setTimeout(()=>onFinish('Delete Event Finished'),3000);
}