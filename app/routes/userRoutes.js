const express = require('express');
const app = express();
const config = require('../../config/appConfig');
const userController = require('../controllers/userController');
const routeMiddleware = require('../middlewares/routeMiddleware');

const setRouter = (app) =>{
    let baseUrl = `${config.apiVersion}`;



app.post(`${baseUrl}/users/login`,userController.login);

    /** 
 * @apiGroup create
 * @apiVersion 1.0.0
 * 
 * @api {post} /api/v1/users/login api for user login
 * @apiParam {string} email email of the user. (body params) (required)
 * @apiParam {string} password password of the user. (body params) (required)
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-Response
 * {
    "error": false,
    "message": "Login Successful",
    "status": 200,
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Ik43X002MlBJZCIsImlhdCI6MTU2MjY5OTQyNDY3NiwiZXhwIjoxNTYyNzg1ODI0LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJtZWV0aW5nLXBsYW5uZXIiLCJkYXRhIjp7InJlc2V0VG9rZW4iOiIiLCJjb3VudHJ5Q29kZSI6IjkxIiwiaXNBZG1pbiI6dHJ1ZSwiX2lkIjoiNWQyMzFiOTJiMWEzYWUwZjg3YjE3NjFjIiwidXNlcklkIjoibnMyQUlaLWN3IiwiZmlyc3ROYW1lIjoiRHVtbXkiLCJsYXN0TmFtZSI6Ik1hbiIsInVzZXJOYW1lIjoiRHVtbXktYWRtaW4iLCJlbWFpbCI6InJhZ2hhdmVuZHJhemluZ0BnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjg5ODk1NjU2MjF9fQ.xj_Y6ZayLSkol9W3Ctp8BqrlNmb4L8PBSPWHqfd3w2Q",
        "userDetails": {
            "resetToken": "",
            "countryCode": "91",
            "isAdmin": true,
            "_id": "5d231b92b1a3ae0f87b1761c",
            "userId": "ns2AIZ-cw",
            "firstName": "Dummy",
            "lastName": "Man",
            "userName": "Dummy-admin",
            "email": "raghavendrazing@gmail.com",
            "mobileNumber": 8989565621
        }
    }
* }
* @apiError {object} apiResponse shows error status, message, http status code, result.
* @apiErrorExample {object} Error-Response
  {
    "error": true,
    "message": "Wrong Password.Login Failed",
    "status": 225,
    "data": null
    }

 */



app.post(`${baseUrl}/users/signup`,userController.signUp);

/** 
 * @apiGroup Read
 * @apiVersion 1.0.0
 * 
 * @api {post} /api/v1/users/signup api for user Signup
 * 
 * @apiParam {string} firstName firstName of the user
 * @apiParam {string} lastName lastName of the user
 * @apiParam {string} email email of the user
 * @apiParam {string} password password of the user
 * @apiParam {string} userName UserName of the user to identify between norma-user and an admin
 * @apiParam {string} mobileNumber mobileNumber of the user
 * @apiParam {string} countryCode CountryCode of the mobileNumber
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-Response
 * 
 * {
    "error": false,
    "message": "User created",
    "status": 200,
    "data": {
        "resetToken": "",
        "countryCode": "91",
        "isAdmin": false,
        "_id": "5d24e984ff231a4b3a3d2521",
        "userId": "0yz9DmUz_",
        "firstName": "Dummy",
        "lastName": "User",
        "userName": "dumb",
        "email": "dummy@gmail.com",
        "mobileNumber": 8197117918,
        "__v": 0
    }
}
* 
* @apiError {object} apiResponse shows error status, message, http status code, result.
* 
* @apiErrorExample {object} Error-Response
* 
* {
    "error": true,
    "message": "User Already Present With this Email",
    "status": 403,
    "data": null
}
*/

 




app.post(`${baseUrl}/users/logout`,routeMiddleware.isAuthorized,userController.logout);

/**
 * 
 * @apiGroup create
 * @apiVersion 1.0.0
 * 
 * @api {post} /api/v1/users/logout api for user logout
 * 
 * @apiParam {string} authToken authToken of the user
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 *
 * @apiSuccessExample {object} Success-Response
 * 
 * {
    "error": false,
    "message": "Logged Out Successfully",
    "status": 200,
    "data": null
}
 *  @apiError {object} apiResponse shows error status, message, http status code, result.
 *  @apiErrorExample {object} Error-Response
 * {
    "error": true,
    "message": "AuthorizationToken Is Missing In Request",
    "status": 400,
    "data": null
}
 *  
 */


    
   
    app.post(`${baseUrl}/users/listNormalUsers`,routeMiddleware.isAuthorized,userController.listNormalUsers);


/**
 * 
 * @apiGroup Read
 * @apiVersion 1.0.0
 * 
 * @api {post} /api/v1/users/listNormalUsers api for listing all the normal users(not admin)
 * 
 * @apiParam {string} authToken authToken of the admin-user
 * 
 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Sucess-Response
 * 
 * {
    "error": false,
    "message": "List of Users",
    "status": 200,
    "data": [
        {
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
        {
            "resetToken": "",
            "countryCode": "91",
            "isAdmin": false,
            "_id": "5d210597366ec934c5861038",
            "userId": "iS1-CrMP7",
            "firstName": "Karthik",
            "lastName": "Karanam",
            "userName": "karthik",
            "email": "karthik@gmail.com",
            "password": "$2b$10$YUQT6k4/tIbp0mu/cWGgFeDtu0mCzw3Jd77/iHa83YpeBq7IRxXde",
            "mobileNumber": 8904244481,
            "__v": 0
        },
        {
            "resetToken": "",
            "countryCode": "91",
            "isAdmin": false,
            "_id": "5d24e984ff231a4b3a3d2521",
            "userId": "0yz9DmUz_",
            "firstName": "Dummy",
            "lastName": "User",
            "userName": "dumb",
            "email": "dummy@gmail.com",
            "password": "$2b$10$TQwFNE.pwBsqT9leXGCHROh4TjriZSM3EBVPYvKE4KNkDLppwxCRi",
            "mobileNumber": 8197117918,
            "__v": 0
        }
    ]
}
 *
 * @apiError {object} apiResponse shows error status, message, http status code, result.
 * @apiErrorExample {object} Error-Response
 * 
 * {
    "error": true,
    "message": "Acess denied as only admin has the previlige to view users",
    "status": 500,
    "data": null
}
 *  
 */
    app.post(`${baseUrl}/users/forgotPassword`,userController.forgotPassword);
    app.post(`${baseUrl}/users/resetPassword`,userController.resetPassword);
}

module.exports = {
    setRoutes : setRouter
}