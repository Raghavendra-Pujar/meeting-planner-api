const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const helmet = require('helmet')
const config = require('./config/appConfig')
const fs = require('fs')
const mongoose = require('mongoose')
const routeLogger = require('./app/middlewares/routeLogger')
const logger = require('./app/libs/loggerLib')
const errorHandlers = require('./app/middlewares/appErrorHandler')

const server = require('http').createServer(app)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())



app.use(routeLogger.logIp)
app.use(errorHandlers.globalErrorHandler)


let modelPath = './app/models'
fs.readdirSync(modelPath).forEach((file) => {
    if (file.indexOf('.js') >= 0) require(modelPath + '/' + file)
})

// Routing imports
let routePath = './app/routes'
fs.readdirSync(routePath).forEach((file) => {
    if (file.indexOf('.js') >= 0) require(routePath + '/' + file).setRoutes(app)
})

//404 error handler
app.use(errorHandlers.globalNotFoundHandler)





server.listen(config.port)
server.on('error', onError)
server.on('listening', onListening)

//socket 
const socketLib = require("./app/libs/socketLib");
const socketServer = socketLib.setServer(server);

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}


function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(config.db.uri, { useNewUrlParser: true });
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})


/*mongoose event handlers*/
mongoose.connection.on('open', (err) => {
    if (err) { console.log("database error") }
    else { console.log("connected to bd") }
})

mongoose.connection.on("error", (err) => {
    console.log("error connected to db")
    console.log(err);
})

