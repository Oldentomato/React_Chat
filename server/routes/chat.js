const express = require('express');
const router = express.Router();
const { Chat } = require("../models/Chat");
const {ChatRooms} = require("../models/ChatRoom")

router.post("/createRoom",(req,res)=>{
    const room = new ChatRooms(req.body);

    room.save((err,doc)=>{
        if(err) return res.json({success: false,err});
        return res.status(200).json({
            success: true
        })
    })
})

router.get("/getChats", (req, res) => {
    Chat.find().populate("sender").exec((err,chats)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(chats)
    })
});

router.post("/getRooms",(req,res)=>{
    ChatRooms.find('...').populate({
        path: '_id',
        select: '...'
    }).populate({
        path: 'user_list',
        match: {'_id': req.body.userId}
    }).exec((err,rooms)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send({
            success: true,
            rooms: rooms
        })
    })
})

module.exports = router;