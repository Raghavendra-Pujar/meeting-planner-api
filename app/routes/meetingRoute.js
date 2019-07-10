const express = require('express');
const app = express();
const config = require('../../config/appConfig');
const userController = require('../controllers/userController');
const meetingController = require('../controllers/meetingController');
const routeMiddleware = require('../middlewares/routeMiddleware');

const setRouter = (app) =>{
    let baseUrl = `${config.apiVersion}`;
    app.post(`${baseUrl}/meeting/create`,routeMiddleware.isAuthorized,meetingController.createMeeting);

    /**
     * @apiGroup create
     * @apiVersion 1.0.0
     * 
     * @api {post} /api/v1/meeting/create api for creating the meeting
     * 
     * @apiParam {string} authToken authToken of the admin 
     * @apiParam {string} title Title of the Meeting
     * @apiParam {string} purpose Purpose of the Meeting
     * @apiParam {string} participantId userId of the participator(normal User) of the Meeting
     * @apiParam {string} from Start time of the Meeting(Format should be in ISO)
     * @apiParam {string} to End time of the Meeting(Format should be in ISO)
     * @apiParam {string} location Location of the Meeting
     * @apiParam {number} priority of the Meeting
     * 
     * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample Sucess-Response
     * {
     *  error: false
        message: "Meeting Scheduled successfully"
        status: 200
     *  data:
        {
            assigner: "5d20fcd72289dd31e42805fc"
            createdOn: "2019-07-09T20:01:36.524Z"
            from: "2019-07-09T20:06:09.053Z"
            location: "Normal"
            meetingId: "QbUskDQKR"
            modifiedOn: "2019-07-09T20:01:36.524Z"
            participator: {resetToken: "", countryCode: "91", _id: "5d208175b6074624f2fcb726", userId: "KYSdE4PYF", firstName: "Raghavendra", …}
            priority: 1
            purpose: "for postman"
            title: "new meeting scheduled"
            to: "2019-07-09T21:06:10.000Z"
            __v: 0
            _id: "5d24f3bed96aa95485d53417"
        }


     * }
     * 
     * @apiError {object} apiResponse shows error status, message, http status code, result.
     * 
     * @apiErrorExample Error-Response
     * {
     *          "error": true,
                "message": "AuthorizationToken Is Missing In Request",
                "status": 400,
                "data": null
     * }
     */

    app.post(`${baseUrl}/meeting/getMeetingByUser`,routeMiddleware.isAuthorized,meetingController.getMeetingsByUser);



    /**
     * 
     * @apiGroup Read
     * @apiVersion 1.0.0
     * 
     * @api {post} /api/v1/meeting/getMeetingsByUser api to get all Meetings of the Normal User
     * 
     * @apiParam {string} authToken authToken of the user
     * 
     * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample 
     * {
    "error": false,
    "message": "Lists for you",
    "status": 200,
    "data": [
        {
            "meetingId": "E4g2J--aa",
            "title": "new means",
            "purpose": "new ",
            "location": "hyd",
            "createdOn": "2019-07-09T18:41:20.441Z",
            "modifiedOn": "2019-07-09T18:41:20.441Z",
            "_id": "5d24e0273edc923f3edca6f8",
            "assigner": {
                "resetToken": "",
                "countryCode": "91",
                "isAdmin": true,
                "_id": "5d20fcd72289dd31e42805fc",
                "userId": "qa_0Piihc",
                "firstName": "Nithin",
                "lastName": "kumar",
                "userName": "nithin-admin",
                "email": "nithin@gmail.com",
                "password": "$2b$10$aGd3cRJKpZEw5E2SO.5.1eYUE6gIHSi0U7c5csOKWuc.2NygXfbyq",
                "mobileNumber": 9898787885,
                "__v": 0
            },
            "participator": {
                "resetToken": "",
                "countryCode": "91",
                "isAdmin": false,
                "_id": "5d208175b6074624f2fcb726",
                "userId": "KYSdE4PYF",
                "firstName": "Raghavendra",
                "lastName": "Pujar",
                "userName": "raghu",
                "email": "raghupujar21@gmail.com",
                "password": "$2b$10$E7VvAhayHm3KUwT8U9QIx.vlwdTgweYF7OBrUeZJGsmxNwgmusjYC",
                "mobileNumber": 8197189730,
                "__v": 0
            },
            "from": "2019-07-09T18:45:33.000Z",
            "to": "2019-07-09T19:42:37.000Z",
            "priority": 3,
            "__v": 0
        }
    ]
}
     * 
     * @apiError {object} apiResponse shows error status, message, http status code, result.
     * @apiErrorExample 
     * {
    "error": true,
    "message": "AuthorizationToken Is Missing In Request",
    "status": 400,
    "data": null
}
     * 
     */
    app.post(`${baseUrl}/meeting/getMeetingBymeetingId`,routeMiddleware.isAuthorized,meetingController.getMeetingById);


    /**
     * @apiGroup Read
     * @apiVersion 1.0.0
     * 
     * @api {post} /api/v1/meeting/getMeetingBymeetingId api for fetching the meeting details by Id
     * 
     * @apiParam {string} authToken authToken of the user
     * @apiParam {string} meetingId MeetingId of the Meeting to be fetched
     * 
     * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample
     * {
    "error": false,
    "message": "Meeting Details found",
    "status": 200,
    "data": {
        "meetingId": "E4g2J--aa",
        "title": "new means",
        "purpose": "new ",
        "location": "hyd",
        "createdOn": "2019-07-09T18:41:20.441Z",
        "modifiedOn": "2019-07-09T18:41:20.441Z",
        "_id": "5d24e0273edc923f3edca6f8",
        "assigner": {
            "resetToken": "",
            "countryCode": "91",
            "isAdmin": true,
            "_id": "5d20fcd72289dd31e42805fc",
            "userId": "qa_0Piihc",
            "firstName": "Nithin",
            "lastName": "kumar",
            "userName": "nithin-admin",
            "email": "nithin@gmail.com",
            "password": "$2b$10$aGd3cRJKpZEw5E2SO.5.1eYUE6gIHSi0U7c5csOKWuc.2NygXfbyq",
            "mobileNumber": 9898787885,
            "__v": 0
        },
        "participator": {
            "resetToken": "",
            "countryCode": "91",
            "isAdmin": false,
            "_id": "5d208175b6074624f2fcb726",
            "userId": "KYSdE4PYF",
            "firstName": "Raghavendra",
            "lastName": "Pujar",
            "userName": "raghu",
            "email": "raghupujar21@gmail.com",
            "password": "$2b$10$E7VvAhayHm3KUwT8U9QIx.vlwdTgweYF7OBrUeZJGsmxNwgmusjYC",
            "mobileNumber": 8197189730,
            "__v": 0
        },
        "from": "2019-07-09T18:45:33.000Z",
        "to": "2019-07-09T19:42:37.000Z",
        "priority": 3,
        "__v": 0
        }
    }


     * 
     * @apiError apiResponse shows error status, message, http status code, result.
     * 
     * @apiErrorExample
     * {
    "error": true,
    "message": "No meeting found with this meetingId",
    "status": 404,
    "data": null
}
     */
    app.post(`${baseUrl}/meeting/editMeeting`,routeMiddleware.isAuthorized,meetingController.editMeeting);



    /**
     * @apiGroup Edit
     * @apiVersion 1.0.0
     * 
     * @api {post} /api/v1/meeting/editMeeting api for editing the meeting details
     * 
     * @apiParam {string} authToken authToken of the admin 
     * @apiParam {string} title Title of the Meeting
     * @apiParam {string} purpose Purpose of the Meeting
     * @apiParam {string} participantId userId of the participator(normal User) of the Meeting
     * @apiParam {string} from Start time of the Meeting(Format should be in ISO)
     * @apiParam {string} to End time of the Meeting(Format should be in ISO)
     * @apiParam {string} location Location of the Meeting
     * @apiParam {number} priority of the Meeting
     * @apiparam {string} meetingId MeetingId of the Meeting to be edited
     * 
     * 
     * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample
     * 
     * {
     *  error: false
        message: "Meeting Edited successfully"
        status: 200
     *  data:
        {
            assigner: "5d20fcd72289dd31e42805fc"
            createdOn: "2019-07-09T20:01:36.524Z"
            from: "2019-07-09T20:06:09.053Z"
            location: "Normal"
            meetingId: "QbUskDQKR"
            modifiedOn: "2019-07-09T20:01:36.524Z"
            participator: {resetToken: "", countryCode: "91", _id: "5d208175b6074624f2fcb726", userId: "KYSdE4PYF", firstName: "Raghavendra", …}
            priority: 1
            purpose: "for postman"
            title: "new meeting scheduled"
            to: "2019-07-09T21:06:10.000Z"
            __v: 0
            _id: "5d24f3bed96aa95485d53417"
        }
     * 
     * }
     * 
     * @apiError {object} apiResponse shows error status, message, http status code, result.
     * @apiErrorExample 
     * {
    "error": true,
    "message": "No meeting found with this meetingId",
    "status": 404,
    "data": null
}
     */


    app.post(`${baseUrl}/meeting/deleteMeeting`,routeMiddleware.isAuthorized,meetingController.deleteMeeting);

    /**
     * 
     * @apiGroup Delete
     * @apiVersion 1.0.0
     * 
     * @api {post} /api/v1/meeting/deleteMeeting api to delete a meeting
     * 
     * @apiParam {string} authToken authToken of the user(admin)
     * @apiParam {string} meetingId meetingId of the Meeting to be deleted
     * 
     * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample
     * 
     * {
    "error": false,
    "message": "Deleted Sucessfully",
    "status": 200,
    "data": null
}   
     * 
     * @apiError {object} apiResponse shows error status, message, http status code, result.
     * @apiErrorExample
     * {
    "error": true,
    "message": "No meetings found with this Id",
    "status": 404,
    "data": null
}
     * 
     */
}


module.exports = {
    setRoutes : setRouter
}