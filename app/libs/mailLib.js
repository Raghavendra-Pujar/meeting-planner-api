const nodemailer = require('nodemailer');
const url = "http://localhost:4200"

let sendMail = (receiverMail,subject,html) =>{
  console.log("New Subject "+subject);
  console.log("New HTML "+ html);


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'raghu.meetingplanner@gmail.com', // generated ethereal user
        pass: 'HariSarvottama'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Meeting Planner" <raghu.meetingplanner@gmail.com>', // sender address
      to: receiverMail, // list of receivers
      subject: subject, // Subject line
      //text: 'Click on the link to access', // plain text body
      html: html // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

     
  });
}

let forgotMail=(email,authToken)=>{
    let subject = "Request for new Password"
    let html = `<p>Hi!, You can reset the password from the below link</p>
    <p>The link will expire in 10mins</p>
    <p>click on the <a href="${url}/reset-password?authToken=${authToken}">link </a></p>`
    sendMail(email,subject,html)
}

let meetingNotification = (email,notificationObj,meeting)=>{
  let subject = notificationObj.message;
  let start = new Date(meeting.from);
  let end = new Date(meeting.to);
  let html = `<p>${notificationObj.message}<p>
  <p> Meeting Title : ${notificationObj.title}</p>
  <p> Meeting Organiser : ${notificationObj.admin}</p>
  <p> Meeting Purpose : ${meeting.purpose}</p>
  <p> Meeting Location : ${meeting.location}</p>
  <p> Starting Time : ${start}</p>
  <p> End Time : ${end} </p>
`

console.log(typeof subject)
  sendMail(email,subject,html);
}

module.exports={
  sendMail:sendMail,
  forgotMail:forgotMail,
  meetingNotification: meetingNotification
}