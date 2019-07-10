let information = (title,message,meetingType,userId,admin)=>{
    let notification={
    title:title,
    message:message,
    meetingType:meetingType,
    userId:userId,
    admin: admin
    }
    return notification;
}

module.exports={
    information:information
}