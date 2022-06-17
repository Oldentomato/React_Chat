import React from 'react'
import moment from "moment"
import {Comment, Tooltip, Avatar} from "antd"

function ChatCard(props) {
  return (
    <div style={{width:'100%'}}>
        <Comment
            author={props.sender.name}
            avatar={
                <Avatar
                    src={props.sender.image} alt={props.sender.name}
                />
            }
            content={
                props.message.substring(0,8) === "uploads/" ?
                

                <img style={{maxWidth: '200px'}}
                 src={`http://localhost:5000/${props.message}`} alt="image"/>
                :
                <p>
                    {props.message}
                </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    </div>
  )
}

export default ChatCard