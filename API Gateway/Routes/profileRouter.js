//Importing Required libraries
const router=require('express').Router();
const {PushRequest}=require('../../_commonUtils/RequestHandler')

//Create Profile Route
router.post('/create',async (req,res)=>{
  const params={
    exchange:'user',
    routingKey:'user.event.create',
    requestID:req.body.requestID,
    data:req.body.data
  };
    PushRequest(params,(error,result)=>{
        res.send(result);
      })


})

//Update Profile Route
router.post('/update',(req,res)=>{
  const params={
    exchange:'user',
    routingKey:'user.event.update',
    requestID:req.body.requestID,
    data:req.body.data
  };
    PushRequest(params,(error,result)=>{
        res.send(result);
      })
})

//Delete Profile Route
router.post('/delete',(req,res)=>{
   const params={
    exchange:'user',
    routingKey:'user.event.delete',
    requestID:req.body.requestID,
    data:req.body.data
  };
    PushRequest(params,(error,result)=>{
        res.send(result);
      })
})


module.exports=router