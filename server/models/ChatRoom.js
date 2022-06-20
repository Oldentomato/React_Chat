const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomsSchema = Schema({
    user_max_num:{
        type: Number
    },
    user_cur_num:{
        type: Number,
        default : 0
    },
    room_name:{
        type: String
    },
    user_list:[{
        user_id: ""
    }]
})

const ChatRooms = mongoose.model('ChatRooms', chatRoomsSchema);
module.exports = {ChatRooms}