const mongoose = require('mongoose');
const meetingModel = mongoose.model('Meeting');
const userModel = mongoose.model('User');
const shortid = require('shortid');
const timeLib = require('../libs/timeLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const eventEmitter = require('./../libs/eventLib').eventEmitter
const notificationLib = require('../libs/notificationLib');
const mailerLib = require('../libs/mailLib');

const presistMeeting = (req, res) => {
    console.log(req.body.from)
    checkPermission = () => {
        return new Promise((resolve, reject) => {
            if (req.user.isAdmin) {
                console.log("Permission granted")
                resolve();
            } else {
                reject();
            }
        })
    }

    checkFromTo = () => {
        return new Promise((resolve, reject) => {
            if (req.body.to <= req.body.from) {
                let apiResponse = response.generate(true, `From-Date cannot be greater than or equal to To-Date`, 500, null);
                reject(apiResponse);
            } else {
                console.log("From To is fine")
                resolve()
            }
        })

    }

    checkParticipantExists = () => {
        return new Promise((resolve, reject) => {
            userModel.findOne({ userId: req.body.participantId }, { isAdmin: false }).exec((err, result) => {
                if (err) {
                    logger.error('Internal Server error', 'meetingController.checkParticipantExists', 10);
                    let apiResponse = response.generate(true, 'Internal Server error', 10, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error('No user exists', 'meetingController.checkParticipantExists', 5);
                    let apiResponse = response.generate(true, 'Participant doesnot exist', 404, null);
                    reject(apiResponse);
                } else {
                    console.log("Participant exists");
                    console.log(result);
                    req.email = result.email;
                    req.participant = result;
                   
                    resolve()
                }
            })
        })
    }

    let checkForConflicts = () => {

        return new Promise((resolve, reject) => {
            meetingModel.find({ participator: req.participant }).exec((err, result) => {
                console.log('In conflicts'+ result);
                if (err) {
                    let apiResponse;
                    logger.error(err.message, 'userController: createUser', 10)
                    if (err.name = "ValidationError") {
                        apiResponse = response.generate(true, err.message, 404, null)
                    } else {
                        apiResponse = response.generate(true, "Internal server error.", 500, null)
                    }
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    resolve();
                } else {
                    console.log('body time' + req.body.from)
                    for (records of result) {
                        console.log('db time' + records.to.toISOString())
            
                        if (req.body.from <= records.to.toISOString() && req.body.from >= records.from.toISOString()) {
                            console.log("Entered");
                            let apiResponse = response.generate(true,'Slot is already booked',500,null);
                            reject(apiResponse);

                        }
                    }
                    resolve();
                }
            })


        })
    }

    let saveMeeting = () => {
        return new Promise((resolve, reject) => {
            let meeting = new meetingModel({
                meetingId: shortid.generate(),
                title: req.body.title,
                assigner: req.user,
                participator: req.participant,
                from: req.body.from,
                to: req.body.to,
                purpose: req.body.purpose,
                location: req.body.location,
                priority: req.body.priority
            })

            meeting.save((err, result) => {
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
                    let newMeeting = meeting.toObject();
                    //console.log(newMeeting);

        
                    let apiResponse = response.generate(false, 'Meeting Scheduled successfully', 200, newMeeting);
                    res.send(apiResponse);

                   

                    let notificationObj = notificationLib.information('New meeting Scheduled',`Meeting scheduled in ${newMeeting.location}`,'create-meeting',req.body.participantId,req.user.firstName);
                    mailerLib.meetingNotification(req.email,notificationObj,newMeeting);
                    eventEmitter.emit(notificationObj.meetingType,notificationObj);
                    
                    
                }
            })
        })



    }

    checkPermission(req, res)
        .then(checkFromTo)
        .then(checkParticipantExists)
        .then(checkForConflicts)
        .then(saveMeeting)
        .then((resolve) => {

        }).catch((err) => {
            res.send(err);
        })

}


getMeetingsByUser = (req, res) => {


    checkUserNotAdmin = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.userId)) {
                req.body.userId = req.user.userId
                console.log(req.body.userId)
            }
            userModel.findOne({ userId: req.body.userId }, { isAdmin: false }, (err, result) => {
                if (err) {
                    logger.error('Internal Server Error', 'meetingController.checkUserNotAdmin', 10);
                    let apiResponse = response.generate(true, 'Internal Server error', 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error('User doesnot exist or is an Admin', 'meetingController.checkuserNotAdmin', 10);
                    let apiResponse = response.generate(true, 'User doesnot exist or is an Admin', 404, null);
                    reject(apiResponse);
                } else {
                    req.participator = result;
                    resolve()
                }
            })
        })
    }

    getList = () => {
        return new Promise((resolve, reject) => {
            meetingModel.find({ participator: req.participator }).populate('assigner').populate('participator').exec((err, result) => {
                if (err) {
                    logger.error('Internal Server Error', 'meetingController.checkUserNotAdmin', 10);
                    let apiResponse = response.generate(true, 'Internal Server error', 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.info('No meetings arranged', 'meetingController.getList()', 5);
                    let apiResponse = response.generate(true, 'No meetings are Scheduled for you', 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result)
                }
            })
        })
    }


    checkUserNotAdmin(req, res)
        .then(getList)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Lists for you', 200, resolve);
            res.send(apiResponse);
        }).catch((err) => {
            res.send(err)
        })
}

let getMeetingById = (req, res) => {
    console.log(`meetingid, ${req.body.meetingId}`)
    if (check.isEmpty(req.body.meetingId)) {
        let apiResponse = response.generate(true, 'MeetingId is required', 404, null);
        res.send(apiResponse);
    }
    else {
        meetingModel.findOne({ meetingId: req.body.meetingId }).populate('assigner').populate('participator').exec((err, result) => {
            if (err) {
                logger.error('Internal Server Error', 'meetingController.checkUserNotAdmin', 10);
                let apiResponse = response.generate(true, 'Internal Server error', 500, null);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.error('No meeting found with this meetingId', 'meetingController.getMeetingsById', 5);
                let apiResponse = response.generate(true, 'No meeting found with this meetingId', 404,null);
                res.send(apiResponse);
            } else {

                
                let apiResponse = response.generate(false, 'Meeting Details found', 200, result);
                res.send(apiResponse);
            }
        })
    }
}


let editMeeting = (req,res) =>{
    let verifyAdmin = () =>{
    return new Promise((resolve,reject)=>{
    userModel.findOne({userId:req.user.userId},{isAdmin:true}).exec((err,result)=>{
        if(err){
            logger.error('Internal Server Error', 'meetingController.verifyAdmin', 10);
            let apiResponse = response.generate(true, 'Internal Server error', 500, null);
            reject(apiResponse);
        }else if(check.isEmpty(result)){
            logger.error('Not an Admin','meetingController.verifyAdmin',10);
            let apiResponse = response.generate(true,'Not an Admin or user doesnot exist',404,null);
            reject(apiResponse);
        }else{
            resolve()
        }

    })
})

    }


    checkFromTo = () => {
        return new Promise((resolve, reject) => {
            if (req.body.to <= req.body.from) {
                let apiResponse = response.generate(true, `From-Date cannot be greater than or equal to To-Date`, 500, null);
                reject(apiResponse);
            } else {
                console.log("From To is fine")
                resolve()
            }
        })

    }

    checkParticipantExists = () => {
        return new Promise((resolve, reject) => {
            userModel.findOne({ userId: req.body.participantId }, { isAdmin: false }).exec((err, result) => {
                if (err) {
                    logger.error('Internal Server error', 'meetingController.checkParticipantExists', 10);
                    let apiResponse = response.generate(true, 'Internal Server error', 10, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error('No user exists', 'meetingController.checkParticipantExists', 5);
                    let apiResponse = response.generate(true, 'Participant doesnot exist', 404, null);
                    reject(apiResponse);
                } else {
                    console.log("Participant exists");
                    console.log(result);
                    req.email = result.email;
                    req.participant = result;
                   
                    resolve()
                }
            })
        })
    }



    let checkForConflicts = () => {

        return new Promise((resolve, reject) => {
            meetingModel.find({ participator: req.participant }).exec((err, result) => {
                console.log('In conflicts'+ result+ req.body.from);
                if (err) {
                    let apiResponse;
                    logger.error(err.message, 'userController: createUser', 10)
                    if (err.name = "ValidationError") {
                        apiResponse = response.generate(true, err.message, 404, null)
                    } else {
                        apiResponse = response.generate(true, "Internal server error.", 500, null)
                    }
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    resolve();
                } else {
                    
                    for (records of result) {
                        console.log('db time' + records.to.toISOString())
                    
                        if (records.meetingId !== req.body.meetingId && req.body.from < records.to.toISOString() && req.body.from > records.from.toISOString()) {
                            console.log("Entered");
                            let apiResponse = response.generate(true,'Slot is already booked',500,null);
                            reject(apiResponse);

                        }
                    }
                    resolve();
                }
            })


        })
    }













    let edit = () =>{
        return new Promise((resolve,reject)=>{
            if(check.isEmpty(req.body.meetingId)){
                let apiResponse = response.generate(true,'MeetingId is missing in the request',404,null);
                reject(apiResponse);
            }

            meetingModel.findOne({meetingId:req.body.meetingId}).populate('assigner').populate('participator').exec((err,result)=>{
                console.log(req.user);
                console.log(result.assigner);
                if(err){
                    logger.error('Internal Server Error', 'meetingController.verifyAdmin', 10);
                    let apiResponse = response.generate(true, 'Internal Server error', 500, null);
                    reject(apiResponse);
                }else if(check.isEmpty(result)){
                    let apiResponse = response.generate(true,'No meeting present',404,null);
                    reject(apiResponse);
                }else if(req.user.userId !== result.assigner.userId){
                    let apiResponse = response.generate(true,'Only Organiser can edit the meeting',500,null);
                    reject(apiResponse);
                }else{
                    result.title = req.body.title;
                    result.purpose = req.body.purpose;
                    result.from = req.body.from,
                    result.to = req.body.to,
                    result.location = req.body.location,
                    result.priority = req.body.priority

                    result.save((err,editedMeeting)=>{
                        if(err){
                            logger.error('Internal Server Error', 'meetingController.verifyAdmin', 10);
                            let apiResponse = response.generate(true, 'Internal Server error', 500, null);
                            reject(apiResponse);
                        }else{

                            let notificationObj = notificationLib.information('Meeting has been Edited',`Your Scheuled Meeting is edited by ${req.user.firstName}`,'edit-meeting',result.participator.userId,req.user.firstName);
                            mailerLib.meetingNotification(result.participator.email,notificationObj,result);
                            
                            eventEmitter.emit(notificationObj.meetingType,notificationObj);

                            let apiResponse = response.generate(false,'Meeting updated uccssfully',200,editedMeeting);
                            res.send(apiResponse);
                        }
                    })
                }
            })
        })
    }

    verifyAdmin(req,res)
    .then(checkFromTo)
    .then(checkParticipantExists)
    .then(checkForConflicts)
    .then(edit)
    .then((resolve)=>{
       
    }).catch((err)=>{
        console.log(err)
        res.send(err);
    })
}


let deleteMeeting = (req,res) =>{

    let verifyAdmin=() =>{
        console.log("verify-admin")
        return new Promise((resolve,reject)=>{
            if(!req.user.isAdmin){
                let apiResponse = response.generate(true,'Only Admin can delete the meeting',500,null);
                reject(apiResponse);
            }else{
                console.log("Admin verified")
                console.log(req.body.meetingId);
                resolve();
            }
        })

    }

    let verifySameAdmin =  () =>{
        return new Promise((resolve,reject)=>{
            meetingModel.findOne({meetingId:req.body.meetingId}).populate('assigner').exec((err,result)=>{
            if(err){
                let apiResponse = response.generate(true,'Internal Server Error',500,null);
                reject(apiResponse);

            }else if(check.isEmpty(result)){
                let apiResponse =response.generate(true,'No meetings found with this Id',404,null);
                reject(apiResponse);
            } 
            
            else if(req.user.userId !== result.assigner.userId){
                let apiResponse = response.generate(true,'Only Organiser can delete the meeting',500,null);
                reject(apiResponse);
            }else{
                resolve();
            }
        })
        })
    }

    let remove=()=>{
        console.log(req.body.meetingId);
        return new Promise((resolve,reject)=>{
            meetingModel.findOneAndDelete({meetingId:req.body.meetingId}).populate('participator').exec((err,result)=>{
                if(err){
                    logger.error('Internal Server Error','meetingController.remove()',10);
                    let apiResponse = response.generate(true,'Internal Server Error',500,null);
                    reject(apiResponse);
                }else if(check.isEmpty(result)){
                    let apiResponse = response.generate(true,'No such meeting found',404,null);
                    resolve(apiResponse);
                }else{

                    let notificationObj = notificationLib.information('Meeting Called Off',`Your Scheduled Meeting is cancelled by ${req.user.firstName}`,'delete-meeting',result.participator.userId,req.user.firstName);
                    mailerLib.meetingNotification(result.participator.email,notificationObj,result);
                    
                    eventEmitter.emit(notificationObj.meetingType,notificationObj);

                    let apiResponse = response.generate(false,'Deleted Sucessfully',200,null);
                    res.send(apiResponse);
                }
            })
        })
    }

    verifyAdmin(req,res)
    .then(verifySameAdmin)
    .then(remove)
    .then((resolve)=>{
        
    }).catch((err)=>{
        console.log(err);
        res.send(err)
    })

}





module.exports = {
    createMeeting: presistMeeting,
    getMeetingsByUser: getMeetingsByUser,
    getMeetingById: getMeetingById,
    editMeeting: editMeeting,
    deleteMeeting:deleteMeeting
}