const router=require('express').Router();
const Queue =require('../../_commonUtils/RMQConnection')

const channel_name='profile_queue';

router.post('/save',(req,res)=>{

    Queue.getQueue().createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'profile_queue';

    channel.assertQueue(queue, {
      durable: false
    });
    const data={
        params:3,
        models:["String1","String2","String3"],
        timestamp:23409039
    }

    channel.sendToQueue(queue,Buffer.from(JSON.stringify(data)));
    console.log(" [x] Sent %s", JSON.stringify(data));
    })
})
router.post('/read',(req,res)=>{
    
})




module.exports=router