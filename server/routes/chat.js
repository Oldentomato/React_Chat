const express = require('express');
const router = express.Router();
const { Chat } = require("../models/Chat");
const {ChatRooms} = require("../models/ChatRoom")

router.post("/createRoom",(req,res)=>{
    const room = new ChatRooms(req.body);

    room.save((err,doc)=>{
        if(err) return res.json({success: false,err});
        ChatRooms.updateOne({_id:doc._id.toString()},{$push:{user_list: {user_id: req.body.user_Id}}},(err)=>{
            if(err) 
                console.log("failed")
            else{
                console.log(doc._id.toString())
                console.log(req.body.user_Id)
            }
                
                
        })
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
    
    // ChatRooms.find({"user_list":{"$elemMatch":{"_id":req.body.userId}}}).populate("user_list").exec((err,rooms)=>{
    //     if(err) return res.status(400).send(err);
    //     res.status(200).send({
    //         success: true,
    //         rooms: rooms
    //     })
    // })
    ChatRooms.find({"user_list":{"$elemMatch":{"user_id":req.body.userId}}},
        (err,rooms)=>{
            if(err) return res.status(400).send(err);
            res.status(200).send({
                success: true,
                rooms: rooms
            })
        }
    )

})

module.exports = router;