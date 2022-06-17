const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
    message: {
        type:String,
    },
    sender: {
        type: Schema.Types.ObjectId,
       ref: 'User'
    },
    room_id:{
        type: Schema.Types.ObjectId,
        ref: 'ChatRooms'
    },
    type : {
        type: String
    },
}, {timestamps: true});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat }