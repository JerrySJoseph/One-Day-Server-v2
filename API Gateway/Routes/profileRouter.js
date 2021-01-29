const router=require('express').Router();
const request=require('../../_commonUtils/RequestHandler')


router.post('/create',(req,res)=>{

  const data={
      id:"Some Id",
      data:"Some Data"
    }
  request.PushToQueue('user_create_queue',data,(err,result)=>{
    if(err)
    console.log("[R-Handler]:Error:"+err.message)
    else
    res.send(JSON.stringify(result));
  })
   
 
    
})
router.post('/read',(req,res)=>{
    
})




module.exports=router