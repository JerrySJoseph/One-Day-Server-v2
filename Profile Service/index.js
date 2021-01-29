const Queue =require('../_commonUtils/RMQConnection')

Queue.InitQueue(()=>{

    Queue.getQueue().createChannel(function(error1, channel) {
        if (error1) {
        throw error1;
        }
        var queue = 'profile_queue';

        channel.assertQueue(queue, {
        durable: false
        });

        channel.consume(queue, (msg)=>{
            console.log("recieved : %s", (msg.content.toString()));
        });
        
    });
})


