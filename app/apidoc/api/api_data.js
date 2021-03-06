define({ "api": [
  {
    "group": "Delete",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/deleteMeeting",
    "title": "api to delete a meeting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user(admin)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>meetingId of the Meeting to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Deleted Sucessfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n    \"error\": true,\n    \"message\": \"No meetings found with this Id\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meetingRoute.js",
    "groupTitle": "Delete",
    "name": "PostApiV1MeetingDeletemeeting"
  },
  {
    "group": "Edit",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/editMeeting",
    "title": "api for editing the meeting details",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the Meeting</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>Purpose of the Meeting</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "participantId",
            "description": "<p>userId of the participator(normal User) of the Meeting</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "from",
            "description": "<p>Start time of the Meeting(Format should be in ISO)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "to",
            "description": "<p>End time of the Meeting(Format should be in ISO)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the Meeting</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "priority",
            "description": "<p>of the Meeting</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>MeetingId of the Meeting to be edited</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "\n{\n error: false\n        message: \"Meeting Edited successfully\"\n        status: 200\n data:\n        {\n            assigner: \"5d20fcd72289dd31e42805fc\"\n            createdOn: \"2019-07-09T20:01:36.524Z\"\n            from: \"2019-07-09T20:06:09.053Z\"\n            location: \"Normal\"\n            meetingId: \"QbUskDQKR\"\n            modifiedOn: \"2019-07-09T20:01:36.524Z\"\n            participator: {resetToken: \"\", countryCode: \"91\", _id: \"5d208175b6074624f2fcb726\", userId: \"KYSdE4PYF\", firstName: \"Raghavendra\", …}\n            priority: 1\n            purpose: \"for postman\"\n            title: \"new meeting scheduled\"\n            to: \"2019-07-09T21:06:10.000Z\"\n            __v: 0\n            _id: \"5d24f3bed96aa95485d53417\"\n        }\n\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n    \"error\": true,\n    \"message\": \"No meeting found with this meetingId\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meetingRoute.js",
    "groupTitle": "Edit",
    "name": "PostApiV1MeetingEditmeeting"
  },
  {
    "group": "Read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/getMeetingBymeetingId",
    "title": "api for fetching the meeting details by Id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>MeetingId of the Meeting to be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n    \"error\": false,\n    \"message\": \"Meeting Details found\",\n    \"status\": 200,\n    \"data\": {\n        \"meetingId\": \"E4g2J--aa\",\n        \"title\": \"new means\",\n        \"purpose\": \"new \",\n        \"location\": \"hyd\",\n        \"createdOn\": \"2019-07-09T18:41:20.441Z\",\n        \"modifiedOn\": \"2019-07-09T18:41:20.441Z\",\n        \"_id\": \"5d24e0273edc923f3edca6f8\",\n        \"assigner\": {\n            \"resetToken\": \"\",\n            \"countryCode\": \"91\",\n            \"isAdmin\": true,\n            \"_id\": \"5d20fcd72289dd31e42805fc\",\n            \"userId\": \"qa_0Piihc\",\n            \"firstName\": \"Nithin\",\n            \"lastName\": \"kumar\",\n            \"userName\": \"nithin-admin\",\n            \"email\": \"nithin@gmail.com\",\n            \"password\": \"$2b$10$aGd3cRJKpZEw5E2SO.5.1eYUE6gIHSi0U7c5csOKWuc.2NygXfbyq\",\n            \"mobileNumber\": 9898787885,\n            \"__v\": 0\n        },\n        \"participator\": {\n            \"resetToken\": \"\",\n            \"countryCode\": \"91\",\n            \"isAdmin\": false,\n            \"_id\": \"5d208175b6074624f2fcb726\",\n            \"userId\": \"KYSdE4PYF\",\n            \"firstName\": \"Raghavendra\",\n            \"lastName\": \"Pujar\",\n            \"userName\": \"raghu\",\n            \"email\": \"raghupujar21@gmail.com\",\n            \"password\": \"$2b$10$E7VvAhayHm3KUwT8U9QIx.vlwdTgweYF7OBrUeZJGsmxNwgmusjYC\",\n            \"mobileNumber\": 8197189730,\n            \"__v\": 0\n        },\n        \"from\": \"2019-07-09T18:45:33.000Z\",\n        \"to\": \"2019-07-09T19:42:37.000Z\",\n        \"priority\": 3,\n        \"__v\": 0\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n    \"error\": true,\n    \"message\": \"No meeting found with this meetingId\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meetingRoute.js",
    "groupTitle": "Read",
    "name": "PostApiV1MeetingGetmeetingbymeetingid"
  },
  {
    "group": "Read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/getMeetingsByUser",
    "title": "api to get all Meetings of the Normal User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n    \"error\": false,\n    \"message\": \"Lists for you\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"meetingId\": \"E4g2J--aa\",\n            \"title\": \"new means\",\n            \"purpose\": \"new \",\n            \"location\": \"hyd\",\n            \"createdOn\": \"2019-07-09T18:41:20.441Z\",\n            \"modifiedOn\": \"2019-07-09T18:41:20.441Z\",\n            \"_id\": \"5d24e0273edc923f3edca6f8\",\n            \"assigner\": {\n                \"resetToken\": \"\",\n                \"countryCode\": \"91\",\n                \"isAdmin\": true,\n                \"_id\": \"5d20fcd72289dd31e42805fc\",\n                \"userId\": \"qa_0Piihc\",\n                \"firstName\": \"Nithin\",\n                \"lastName\": \"kumar\",\n                \"userName\": \"nithin-admin\",\n                \"email\": \"nithin@gmail.com\",\n                \"password\": \"$2b$10$aGd3cRJKpZEw5E2SO.5.1eYUE6gIHSi0U7c5csOKWuc.2NygXfbyq\",\n                \"mobileNumber\": 9898787885,\n                \"__v\": 0\n            },\n            \"participator\": {\n                \"resetToken\": \"\",\n                \"countryCode\": \"91\",\n                \"isAdmin\": false,\n                \"_id\": \"5d208175b6074624f2fcb726\",\n                \"userId\": \"KYSdE4PYF\",\n                \"firstName\": \"Raghavendra\",\n                \"lastName\": \"Pujar\",\n                \"userName\": \"raghu\",\n                \"email\": \"raghupujar21@gmail.com\",\n                \"password\": \"$2b$10$E7VvAhayHm3KUwT8U9QIx.vlwdTgweYF7OBrUeZJGsmxNwgmusjYC\",\n                \"mobileNumber\": 8197189730,\n                \"__v\": 0\n            },\n            \"from\": \"2019-07-09T18:45:33.000Z\",\n            \"to\": \"2019-07-09T19:42:37.000Z\",\n            \"priority\": 3,\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n    \"error\": true,\n    \"message\": \"AuthorizationToken Is Missing In Request\",\n    \"status\": 400,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meetingRoute.js",
    "groupTitle": "Read",
    "name": "PostApiV1MeetingGetmeetingsbyuser"
  },
  {
    "group": "Read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/listNormalUsers",
    "title": "api for listing all the normal users(not admin)",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the admin-user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucess-Response",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"List of Users\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"resetToken\": \"\",\n            \"countryCode\": \"91\",\n            \"isAdmin\": false,\n            \"_id\": \"5d208175b6074624f2fcb726\",\n            \"userId\": \"KYSdE4PYF\",\n            \"firstName\": \"Raghavendra\",\n            \"lastName\": \"Pujar\",\n            \"userName\": \"raghu\",\n            \"email\": \"raghupujar21@gmail.com\",\n            \"password\": \"$2b$10$E7VvAhayHm3KUwT8U9QIx.vlwdTgweYF7OBrUeZJGsmxNwgmusjYC\",\n            \"mobileNumber\": 8197189730,\n            \"__v\": 0\n        },\n        {\n            \"resetToken\": \"\",\n            \"countryCode\": \"91\",\n            \"isAdmin\": false,\n            \"_id\": \"5d210597366ec934c5861038\",\n            \"userId\": \"iS1-CrMP7\",\n            \"firstName\": \"Karthik\",\n            \"lastName\": \"Karanam\",\n            \"userName\": \"karthik\",\n            \"email\": \"karthik@gmail.com\",\n            \"password\": \"$2b$10$YUQT6k4/tIbp0mu/cWGgFeDtu0mCzw3Jd77/iHa83YpeBq7IRxXde\",\n            \"mobileNumber\": 8904244481,\n            \"__v\": 0\n        },\n        {\n            \"resetToken\": \"\",\n            \"countryCode\": \"91\",\n            \"isAdmin\": false,\n            \"_id\": \"5d24e984ff231a4b3a3d2521\",\n            \"userId\": \"0yz9DmUz_\",\n            \"firstName\": \"Dummy\",\n            \"lastName\": \"User\",\n            \"userName\": \"dumb\",\n            \"email\": \"dummy@gmail.com\",\n            \"password\": \"$2b$10$TQwFNE.pwBsqT9leXGCHROh4TjriZSM3EBVPYvKE4KNkDLppwxCRi\",\n            \"mobileNumber\": 8197117918,\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Acess denied as only admin has the previlige to view users\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoutes.js",
    "groupTitle": "Read",
    "name": "PostApiV1UsersListnormalusers"
  },
  {
    "group": "Read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user Signup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>UserName of the user to identify between norma-user and an admin</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryCode",
            "description": "<p>CountryCode of the mobileNumber</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"resetToken\": \"\",\n        \"countryCode\": \"91\",\n        \"isAdmin\": false,\n        \"_id\": \"5d24e984ff231a4b3a3d2521\",\n        \"userId\": \"0yz9DmUz_\",\n        \"firstName\": \"Dummy\",\n        \"lastName\": \"User\",\n        \"userName\": \"dumb\",\n        \"email\": \"dummy@gmail.com\",\n        \"mobileNumber\": 8197117918,\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"User Already Present With this Email\",\n    \"status\": 403,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoutes.js",
    "groupTitle": "Read",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "create",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/create",
    "title": "api for creating the meeting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the Meeting</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>Purpose of the Meeting</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "participantId",
            "description": "<p>userId of the participator(normal User) of the Meeting</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "from",
            "description": "<p>Start time of the Meeting(Format should be in ISO)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "to",
            "description": "<p>End time of the Meeting(Format should be in ISO)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the Meeting</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "priority",
            "description": "<p>of the Meeting</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucess-Response",
          "content": "{\n error: false\n        message: \"Meeting Scheduled successfully\"\n        status: 200\n data:\n        {\n            assigner: \"5d20fcd72289dd31e42805fc\"\n            createdOn: \"2019-07-09T20:01:36.524Z\"\n            from: \"2019-07-09T20:06:09.053Z\"\n            location: \"Normal\"\n            meetingId: \"QbUskDQKR\"\n            modifiedOn: \"2019-07-09T20:01:36.524Z\"\n            participator: {resetToken: \"\", countryCode: \"91\", _id: \"5d208175b6074624f2fcb726\", userId: \"KYSdE4PYF\", firstName: \"Raghavendra\", …}\n            priority: 1\n            purpose: \"for postman\"\n            title: \"new meeting scheduled\"\n            to: \"2019-07-09T21:06:10.000Z\"\n            __v: 0\n            _id: \"5d24f3bed96aa95485d53417\"\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "{\n         \"error\": true,\n                \"message\": \"AuthorizationToken Is Missing In Request\",\n                \"status\": 400,\n                \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meetingRoute.js",
    "groupTitle": "create",
    "name": "PostApiV1MeetingCreate"
  },
  {
    "group": "create",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Ik43X002MlBJZCIsImlhdCI6MTU2MjY5OTQyNDY3NiwiZXhwIjoxNTYyNzg1ODI0LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJtZWV0aW5nLXBsYW5uZXIiLCJkYXRhIjp7InJlc2V0VG9rZW4iOiIiLCJjb3VudHJ5Q29kZSI6IjkxIiwiaXNBZG1pbiI6dHJ1ZSwiX2lkIjoiNWQyMzFiOTJiMWEzYWUwZjg3YjE3NjFjIiwidXNlcklkIjoibnMyQUlaLWN3IiwiZmlyc3ROYW1lIjoiRHVtbXkiLCJsYXN0TmFtZSI6Ik1hbiIsInVzZXJOYW1lIjoiRHVtbXktYWRtaW4iLCJlbWFpbCI6InJhZ2hhdmVuZHJhemluZ0BnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjg5ODk1NjU2MjF9fQ.xj_Y6ZayLSkol9W3Ctp8BqrlNmb4L8PBSPWHqfd3w2Q\",\n        \"userDetails\": {\n            \"resetToken\": \"\",\n            \"countryCode\": \"91\",\n            \"isAdmin\": true,\n            \"_id\": \"5d231b92b1a3ae0f87b1761c\",\n            \"userId\": \"ns2AIZ-cw\",\n            \"firstName\": \"Dummy\",\n            \"lastName\": \"Man\",\n            \"userName\": \"Dummy-admin\",\n            \"email\": \"raghavendrazing@gmail.com\",\n            \"mobileNumber\": 8989565621\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "{\n  \"error\": true,\n  \"message\": \"Wrong Password.Login Failed\",\n  \"status\": 225,\n  \"data\": null\n  }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoutes.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "create",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api for user logout",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "\n{\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "{\n    \"error\": true,\n    \"message\": \"AuthorizationToken Is Missing In Request\",\n    \"status\": 400,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoutes.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersLogout"
  }
] });
