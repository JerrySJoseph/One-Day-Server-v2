const {PullRequest}=require('../_commonUtils/RequestHandler')
const mongoose=require('mongoose');
const log=require('./Utils/log');
const {prepareProfileObject} = require('./Utils/ProfileHelper')



mongoose.connect('mongodb://localhost:27017/one_day_profiles_db',
    {useNewUrlParser:true,useUnifiedTopology:true},
    (error)=>{
        if(error)
            return log.error(error.message);
        
        log.info('Connected to Database')
       //Registering Pull Requests for Queues
        PullRequest({exchange:'user',routingKey:'user.event.create'},(data,onfinish)=>{
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
            onfinish(response)
            })
        });
        PullRequest({exchange:'user',routingKey:'user.event.update'},updateEvent);
        PullRequest({exchange:'user',routingKey:'user.event.delete'},deleteEvent);
        log.info('Events Registered')     
       
        
    })



function createEvent(data,onFinish){
    
}
function updateEvent(data,onFinish){
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
function deleteEvent(data,onFinish){
    setTimeout(()=>onFinish('Delete Event Finished'),3000);
}