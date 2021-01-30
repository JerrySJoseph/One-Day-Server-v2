const {PullRequest}=require('./Utils/RequestHandler')
const mongoose=require('mongoose');
const log=require('./Utils/log');
const {prepareProfileObject} = require('./Utils/ProfileHelper')
const Queue=require('./Utils/RMQConnection')


mongoose.connect('mongodb://localhost:27017/one_day_profiles_db',
    {useNewUrlParser:true,useUnifiedTopology:true},
    (error)=>{
        if(error)
            return log.error(error.message);
        log.info('Connected to Database')
       //Registering Pull Requests for Queues
        PullRequest({exchange:'user',routingKey:'user.event.create'},createEvent);
        PullRequest({exchange:'user',routingKey:'user.event.update'},updateEvent);
        PullRequest({exchange:'user',routingKey:'user.event.delete'},deleteEvent);
        log.info('Events Registered')     
       
        
    })



function createEvent(data,onFinish){
    setTimeout(onFinish('Create Event Finished'),3000);
}
function updateEvent(data,onFinish){
    setTimeout(onFinish('Update Event Finished'),3000);
}
function deleteEvent(data,onFinish){
    setTimeout(onFinish('Delete Event Finished'),3000);
}