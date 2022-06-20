import React,{useEffect, useState} from 'react'
import {Form, Icon, Input, Button, Row, Col} from 'antd'
import io from "socket.io-client"
import {connect} from "react-redux"
import moment from "moment"
import {getChats,afterPostMessage} from "../../../_actions/chat_actions"
import ChatCard from "./Sections/ChatCard"
import DropZone from "react-dropzone"
import axios from "axios"
import {useParams} from "react-router-dom"

function ChatPage(props) {

    const [chatMessage, setchatMessage] = useState("");
    const RoomID = useParmas();
    useEffect(()=>{
        let server = "http://localhost:5000";
        socket = io(server);
        
        
    },[])
  return (
    <div>ChatPage</div>
  )
}

export default ChatPage