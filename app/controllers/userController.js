const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const AuthModel = mongoose.model('Auth');


const bcrypt = require('bcrypt');
const shortid = require('shortid')

const check = require('../libs/checkLib');
const response = require('../libs/responseLib');
const passwordLib = require('../libs/passwordLib');
const inputValidate = require('../libs/paramsValidationLib');
const logger = require('../libs/loggerLib');
const token = require('../libs/tokenLib')
const time = require('../libs/timeLib');

const mailerLib = require('../libs/mailLib');

let signUp = (req, res) => {


    let validateUserDetails = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!inputValidate.Email(req.body.email)) {
                    let apiResponse = response.generate('true', 'Email invalid', 500, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate('true', 'Password is missing', 500, null);
                    reject(apiResponse);
                } else {
                    resolve(req);
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate('true', 'Email is missing', 500, null);
                reject(apiResponse);
            }
        })
    }



    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email }).exec((err, retrievedUserDetails) => {
                if (err) {
                    logger.error(err.message, 'userController: createUser', 10)
                    let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedUserDetails)) {
                    console.log(req.body);
                    let User = new UserModel({
                        userId : shortid.generate(),
                        firstName: req.body.firstName,
                        lastName : req.body.lastName,
                        userName: req.body.userName,
                        email: req.body.email,
                        password: passwordLib.hashpassword(req.body.password),
                        countryCode: req.body.countryCode,
                        mobileNumber : req.body.mobileNumber,
                        isAdmin: check.checkuserType(req.body.userName)
                        
                    });

                    User.save((err, result) => {
                        if (err) {
                            let apiResponse;
                            logger.error(err.message, 'userController: createUser', 10)
                            if (err.name = "ValidationError") {
                                apiResponse = response.generate(true, err.message, 404, null)
                            } else {
                                apiResponse = response.generate(true, "Internal server error.", 500, null)
                            }
                            reject(apiResponse)
                        } else {
                            console.log("user created")
                            let newUserObj = result.toObject();
                            resolve(newUserObj)
                        }
                    })
                }else {
                    logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                    let apiResponse = response.generate(true, 'User Already Present With this Email', 404, null)
                    reject(apiResponse)
                }
            })
        })

    
}
    validateUserDetails(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })


}

let login = function (req, res) {
    console.log(req.body.email);

    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
        

            if (!check.isEmpty(req.body.email)) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 400, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found!Please check your email', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, 'email is missing', 404, null)
                reject(apiResponse)
            }
        })
    }

    let validatePassword = (retrievedUserDetails) => {
        
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            if(check.isEmpty(req.body.password)){
                logger.info('Password is missing','userController.validatPassword()',10);
                let apiResponse = response.generate(true,'Password is missing',404,null);
                reject(apiResponse);
            }
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 401, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    //delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 225, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }


    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }



    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}

let listNormalUser = (req,res)=>{

    let pageNo = parseInt(req.body.pageNo);
    let size = parseInt(req.body.size);
    let query = {}
    if (pageNo < 0 || pageNo === 0) {
        apiresponse = response.generate(true, "invalid page number, should start with 1", 400, null);
        return res.send(response)
    }

    query.skip = size * (pageNo - 1)
    query.limit = size




    if(!req.user.isAdmin){
        logger.info('Permission denied as you are not an admin','userConroller.listNormalUsers',5);
        let apiResponse = response.generate(true,'Acess denied as only admin has the previlige to view users',500,null);
        res.send(apiResponse);
    }
 UserModel.find({isAdmin : false}).skip(query.skip).limit(query.limit).exec((err,result)=>{
     if(err){
        logger.error(err.message, 'userController: listNormalUser', 10)
        let apiResponse = response.generate(true, 'Failed To list Users', 500, null)
        res.send(apiResponse)
     }else if(check.isEmpty(result)){
         logger.error('No users are present as of now','userController.listNormalUser',10);
         let apiResponse = response.generate(true,'Currently there are no users to show',200,null);
         res.send(apiResponse);
     }else{
         let apiResponse = response.generate(false,'List of Users',200,result);
         res.send(apiResponse);
     }
 })
}

let forgotPassword = (req,res)=>{

    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
        

            if (!check.isEmpty(req.body.email)) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 400, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found!Please check your email', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, 'email is missing', 404, null)
                reject(apiResponse)
            }
        })
    }

    let generateResetToken = (userDetails)=>{
        return new Promise((resolve, reject) => {
            token.generateResetToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    //tokenDetails.userId = userDetails.userId
                    //tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }


    let saveToken = (token)=>
    
    {
        console.log(token);
        return new Promise((resolve, reject) => {
            UserModel.updateOne({ email: req.body.email }, { resetToken: token.token })
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = response.generate(true, "Internal server error", 500, null)
                        reject(apiResponse)
                    } else {
                        mailerLib.forgotMail(req.body.email,token.token);
                        resolve(token)
                    }
                })
        })

    }

    findUser()
    .then(generateResetToken)
    .then(saveToken)
    .then((result)=>{
       
        let apiResponse = response.generate(true,'Mail to reset password has been sent',200,null);
        res.send(apiResponse);
    }).catch((err)=>{
        res.send(err);
    })
}


let resetPassword = (req,res) =>{
    
   let decodeToken = ()=>{
       return new Promise((resolve,reject)=>{
        if(check.isEmpty(req.body.authToken)){
            let apiResponse = response.generate(true,'Authorization key is missing',null);
            reject(apiResponse);
           }else{
               UserModel.findOne({resetToken:req.body.authToken}).exec((err,result)=>{
                   if(err){
                    let apiResponse = response.generate(true, "Internal server error", 500, null)
                    reject(apiResponse)
                   }else if(check.isEmpty(result)){
                    let apiResponse = response.generate(true, "Invalid Token", 404, null)
                    reject(apiResponse)

                   }else{
                       token.verifyWithoutSecret(req.body.authToken,(err,decoded)=>{
                        if (err) {
                            let apiResponse = response.generate(true, "Invalid or expired token", 404, null)
                            reject(apiResponse)
                        } else {
                            req.user = decoded.data;
                            console.log(req.user);
                            resolve(req);                        }
                       })
                   }
               })
           }
    })
   }



   let updatePassword = () =>{
       return new Promise((resolve,reject)=>{
           console.log(req.body.password);
       if(check.isEmpty(req.body.password)){
        let apiResponse = response.generate(true,'Password to update is missing in request',null);
        reject(apiResponse);
       }else{
           console.log('here in else')
           let newPassword = passwordLib.hashpassword(req.body.password);
           UserModel.updateOne({userId:req.user.userId},{resetToken:'',password:newPassword}).exec((err,result)=>{
               console.log(result)
            if (err) {
                let apiResponse = response.generate(true, "Internal server error", 500, null)
                reject(apiResponse)
            }else if(check.isEmpty(result)){
                console.log('here');
            } 
            
            else {
                console.log('success')
                let apiResponse = response.generate(false, "Password updated Successfully", 200, null);
                res.send(apiResponse)
            }
           })
       }
    })
   }

   decodeToken(req,res)
   .then(updatePassword).then((resolve)=>{

   }).catch((err)=>{
       res.send(err);
   })
}

let logout = (req, res) => {
    AuthModel.findOneAndDelete({userId: req.user.userId}, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
      })
} // end of the logout function.

module.exports ={
    signUp : signUp,
    login : login,
    forgotPassword: forgotPassword,
    resetPassword:resetPassword,
    listNormalUsers : listNormalUser,
    logout:logout
}