const {FirebaseAdmin}=require('./FirebaseAdminInit');

const isAuthorized=(req,res,next)=>
{
    const token=req.header('auth-token');
    if(!token)
       return res.status(401).send('Access Denied : You are not authorized to access this API') 
    else
    {
        FirebaseAdmin.auth().verifyIdToken(token)
            .then((decodedToken) => {
                
               next()
                })
                .catch((error) => {
                    return res.status(401).send('Access Denied :'+error.message) ;
                });
                    
       
    }

}

module.exports.isAuthorized= isAuthorized