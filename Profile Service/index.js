const Queue =require('../_commonUtils/RMQConnection')
const request=require('../_commonUtils/RequestHandler')
const mongoose=require('mongoose');
const {QUEUE_TAG}=require('../Constants/QueuVars')
const {prepareProfileObject} = require('./Utils/ProfileHelper')

//Initialising Event Queues for inter-service communication
Queue.InitQueue(()=>{

    mongoose.connect('mongodb://localhost:27017/one_day_profiles_db', {useNewUrlParser:true,useUnifiedTopology:true},(error)=>{
        if(error)
            return console.error("[PROFILE SERVICE] DB Error:%s",error.message)
        
        console.info("[PROFILE SERVICE] DB Connection Successfull");

        //Pull Events for CREATE USER
        request.PullfromQueue(QUEUE_TAG.create_user,(data,responseCallback)=>{
            //Perform Operations
            const userProfile=prepareProfileObject(data);
            userProfile.updateOne(userProfile,{upsert:true},(mongoError,result)=>{
                
                //After complete call reponseCallback('data')
                if(mongoError)
                    responseCallback({
                        success:false,
                        message:mongoError.message
                    })
                else  responseCallback({
                        success:true,
                        message:"Profile Saved SuccessFully"
                    })
            })
            
        });

        //Pull Events for UPDATE USER
        request.PullfromQueue(QUEUE_TAG.update_user,(data,responseCallback)=>{
            //Perform Operations

            //After complete call reponseCallback('data')

        });
        //Pull Events for DELETE USER
        request.PullfromQueue(QUEUE_TAG.delete_user,(data,responseCallback)=>{
            //Perform Operations

            //After complete call reponseCallback('data')

        });
        })

    
})

