import React, { Component } from 'react'
import { Form, Icon, Input, Button, Row, Col, } from 'antd';
import io from "socket.io-client";
import { connect } from "react-redux";
import  moment  from "moment";
import {getChats,afterPostMessage} from "../../../_actions/chat_actions"
import ChatCard from "./Sections/ChatCard"
import DropZone from 'react-dropzone';
import axios from "axios";
import {useParams} from "react-router-dom"


export class ChatPage extends Component {
    state= {
        chatMessage: "",
        RoomID: ""
    }
    
    
    componentDidMount() {
        let server = "http://localhost:5000";
        this.props.dispatch(getChats());
        this.state.RoomID = useParams();
        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            this.props.dispatch(afterPostMessage(messageFromBackEnd))
        })
    }

    hanleSearchChange =(e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    renderCards = () => {
        return this.props.chats.chats && this.props.chats.chats.map((chat)=>(
            <ChatCard key={chat._id} {...chat} />
        ));
    }

    onDrop = (files) => {
        if(this.props.user.userData && !this.props.user.userData.isAuth){
            return alert('Please Log in first')
        }

        let formData = new FormData;
        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }
        formData.append("file",files[0])

        axios.post('/api/upload/uploadfiles',formData,config).then(response=>{
            if(response.data.success){
                let chatMessage = response.data.url;
                let userId = this.props.user.userData._id;
                let userName = this.props.user.userData.name;
                let userImage = this.props.user.userData.image;
                let roomId = this.state.RoomID;
                let nowTime = moment();
                let type = "VideoOrImage";

                this.socket.emit("Input Chat Message",{
                    chatMessage,
                    userId,
                    userName,
                    userImage,
                    roomId,
                    nowTime,
                    type
                });
            }
        })
    
    }

    submitChatMessage = (e) => {
        e.preventDefault();

        if(this.state.chatMessage !== ""){
            let chatMessage = this.state.chatMessage
            let userId = this.props.user.userData._id
            let userName = this.props.user.userData.name;
            let userImage = this.props.user.userData.image;
            let roomId = this.state.RoomID;
            let nowTime = moment();
            let type = "Text"
    
            this.socket.emit("Input Chat Message", {
                chatMessage,
                userId,
                userName,
                userImage,
                roomId,
                nowTime,
                type
            });
            this.setState({ chatMessage: "" })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center' }}> Real Time Chat</p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="infinite-container" style={{ height: '500px' }}>
                        {this.props.chats && (
                            this.renderCards()
                            
                        )}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left", clear: "both" }}
                        />
                    </div>

                    <Row >
                        <Form layout="inline" onSubmit={this.submitChatMessage}>
                            <Col span={18}>
                                <Input
                                    id="message"
                                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Let's start talking"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.hanleSearchChange}
                                />
                            </Col>
                            <Col span={2}>
                                <DropZone onDrop={this.onDrop}>
                                    {({getRootProps, getInputProps})=>(
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button>
                                                    <Icon type="upload"/>
                                                </Button>
                                            </div>
                                        </section>
                                    )}
                                </DropZone>

                            </Col>

                            <Col span={4}>
                                <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage}  htmlType="submit">
                                    <Icon type="enter" />
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chats: state.chat
    }
}


export default connect(mapStateToProps)(ChatPage);
