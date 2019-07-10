const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const secretKey = "R@gHUPujAr@#$%^!*()*/9515.054@123H@RIV@Yu";

let generateToken = (data,cb) =>{
    try{
    let claims = {
        jwtid : shortid.generate(),
        iat : Date.now(),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        sub : 'authToken',
        iss : 'meeting-planner',
        data : data
    }
    let tokenDetails = {
       token : jwt.sign(claims,secretKey),
       tokenSecret: secretKey
    }
    cb(null,tokenDetails)
}
    catch(err){
        console.log(err);
        cb(err,null)
    }
    
};
//end of generate Token

let generateResetToken = (data,cb) =>{
  try{
    let claims = {
        jwtid : shortid.generate(),
        iat : Date.now(),
        exp: Math.floor(Date.now() / 1000) + (60*10),//10 mins
        sub : 'reset-token',
        iss : 'meeting-planner',
        data : data
    }
    let tokenDetails = {
       token : jwt.sign(claims,secretKey),
       tokenSecret: secretKey
    }
    cb(null,tokenDetails)
}
    catch(err){
        console.log(err);
        cb(err,null)
    }
    

}

let verifyClaim = (token,secretKey,cb)=>{
    jwt.verify(token, secretKey, function (err, decoded) {
        if(err){
          console.log("error while verifying token");
          console.log(err);
          cb(err,null)
        }
        else{
          console.log("user verified");
          //console.log(decoded);
          cb(null,decoded);
        }  
      });
}


let verifyWithoutSecret = (token,cb) => {
  // verify a token symmetric
  jwt.verify(token, secretKey, function (err, decoded) {
    if(err){
      console.log("error while verify token");
      console.log(err);
      cb(err,null)
    }
    else{
      console.log("user verified");
      console.log(decoded)
      cb (null,decoded)
    }  
 
 
  });


}// end verify claim 


module.exports = {
    generateToken: generateToken,
    generateResetToken:generateResetToken,
    verifyToken :verifyClaim,
    verifyWithoutSecret : verifyWithoutSecret
  }