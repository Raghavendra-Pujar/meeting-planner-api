const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const time = require('../libs/timeLib');
const meetingSchema = new Schema({
    meetingId:{
        type: String,
        default: '',
        unique: true,
        required: true
    },
    title:{
        type: String,
        default:'',
        required:true
    },
    assigner:{
        type : Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    participator:{
        type : Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    from:{
        type: Date,
        required: true
    },
    to:{
        type: Date,
        required: true
    },
    purpose:{
        type: String,
        default:'',
        required:true,
    },
    location:{
        type: String,
        default:'',
        required:true,
    },
    priority:{
        type:Number,
        enum:[1,2,3]
    },
    createdOn:{
        type: Date, 
        default: Date.now()
    },
    modifiedOn:{
        type: Date, 
        default: Date.now()
    }
    

})

mongoose.model('Meeting',meetingSchema);