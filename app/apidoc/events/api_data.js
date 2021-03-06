define({ "api": [
  {
    "group": "Emit",
    "version": "1.0.0",
    "type": "event",
    "url": "set-user",
    "title": "setting the user details",
    "description": "<p>This event should emitted by the client to register and set user detail to the socket connection. With out this the server will not identify the user as valid user.</p>",
    "filename": "events/events.js",
    "groupTitle": "Emit",
    "name": "EventSetUser"
  },
  {
    "group": "Listen",
    "version": "1.0.0",
    "type": "event",
    "url": "meeting-notification",
    "title": "listening for meeting pertained noifications",
    "description": "<p>This event (userId ) has to be listened on the user's end to receive notification(create,edit,delete.reminder) from server.</p>",
    "filename": "events/events.js",
    "groupTitle": "Listen",
    "name": "EventMeetingNotification"
  },
  {
    "group": "Listen",
    "version": "1.0.0",
    "type": "event",
    "url": "verifyUser",
    "title": "listening to verifyUser",
    "description": "<p>This event (&quot;verifyUser&quot;) has to be listened on the user's end to verify user authentication. user will only be set as online user after verification of authentication token.</p>",
    "filename": "events/events.js",
    "groupTitle": "Listen",
    "name": "EventVerifyuser"
  }
] });
