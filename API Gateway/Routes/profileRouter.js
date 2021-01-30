const router=require('express').Router();
const request=require('../../_commonUtils/RequestHandler')


router.post('/create',(req,res)=>{

  request.PushToQueue('user_create_queue',req.body,(err,result)=>{
    if(err)
    {console.log("[R-Handler]:Error:"+err.message)
    return res.send(err.message);
      }
    else
    return res.send(result);
  })
   
 
    
})
router.post('/read',(req,res)=>{
    
})


module.exports=router