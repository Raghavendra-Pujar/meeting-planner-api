const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const notificationLib = require('../libs/notificationLib'); 
const mailerLib = require('../libs/mailLib');
const timeLib = require('../libs/timeLib');

const eventEmitter = require('../libs/eventLib').eventEmitter

const meetingModel= mongoose.model('Meeting');
const userModel = mongoose.model('User');

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib');

const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Calcutta'

const setServer = (server) =>{
    let io = socketio.listen(server);
    let myIo = io.of('/');
    console.log("Reached here")
    myIo.on('connection',(socket)=>{
        console.log('Someone is trying to connect');


        socket.emit('verifyUser','');
        socket.on('set-user',(authToken)=>{
            console.log("set-user reached")
            tokenLib.verifyWithoutSecret(authToken,(err,decoded)=>{
                if(err){
                    socket.emit('authError', '');
                }else{
                    console.log(`${decoded.data.firstName} is conncted`)

                    userModel.find({isAdmin:false}).exec((err,result)=>{
                        if(err){
                            socket.emit('connection-error','');
                        }else if(check.isEmpty(result)){
                            console.log('No Users found');
                        }else{
                            result.forEach(ele=>{
                                socket.join(ele.userId)
                            })
                        }
                    })

                }
            })
        })

        socket.on("disconnect", () => {
            console.log(`${socket.userId} disconnected`)
            socket.userId = null // this was added to tackle an issue of multiple connections! Apparently the socket io server does not suspend the removed connection and even after disconnection they keep receiving messages from the rooms.
        })

        try{
        eventEmitter.on('create-meeting',(notification)=>{
            console.log('socket  reached')
            socket.emit(notification.userId,notification)
        })
        }catch(err){
            console.error('caught while receiving:', err.message);
    
        }

        try{
            eventEmitter.on('edit-meeting',(notification)=>{
                console.log('socket edit reached');
                socket.emit(notification.userId,notification)
            })

        }catch(err){
            console.error('caught while receiving:', err.message);
        }

        try{
            eventEmitter.on('delete-meeting',(notification)=>{
                console.log('socket delete reached');
                socket.emit(notification.userId,notification);
            })

        }catch(err){
            console.log('caught while receiving:',err.message);
        }

        try{
            eventEmitter.on('reminder',(notification)=>{
                console.log('socket reminder reached');
                console.log(notification);
                socket.emit(notification.userId,notification);
            })

        }catch(err){
            console.log('caught while receiving:',err.message);
        }
        
    })

}


let getMeetingInAMinute=()=>{
    let currentTime = Date.now();
    //console.log(timeLib.convertToLocalTime(currentTime));
    let oneMin = currentTime + (60*1000);
    //console.log( (oneMin));
    //console.log((oneMin - currentTime)/1000);
    meetingModel.find({from:{ $gte: currentTime, $lte: oneMin}}).populate('participator').populate('assigner').exec((err,result)=>{
        if(result){
            result.forEach((meeting)=>{
                console.log(timeLib.convertToLocalTime(meeting.from))
                let notificationObj = notificationLib.information('Meeting Reminder','Your meeting is scheduled in 1min','reminder',meeting.participator.userId,meeting.assigner.firstName);
                mailerLib.meetingNotification(meeting.participator.email,notificationObj,meeting);
                eventEmitter.emit('reminder',notificationObj)
            })
        }
    })
}

setInterval(getMeetingInAMinute,60*1000);//1000millisec = 1sec and 60 sec = 1min

module.exports={
    setServer : setServer
}