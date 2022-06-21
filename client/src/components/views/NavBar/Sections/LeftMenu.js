import React,{useEffect, useState} from 'react';
import {getRooms} from "../../../../_actions/chat_actions"
import {auth} from "../../../../_actions/user_actions"
import { Menu } from 'antd';
import {useDispatch} from "react-redux";
import axios from 'axios'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const dispatch = useDispatch();
  const [user,setuser] = useState("");
  const [rooms, setrooms] = useState([]);

  const Chat_Rooms = rooms.map((file,index)=>{
    return(
      <Menu.Item key={"room_"+index}><a href={`/chat/${file._id}`}>{file.room_name}</a></Menu.Item>
    )
  })

  const Create_Room = () =>{
    let room_data={
      user_max_num : 5,
      room_name: 'Test_Room',
      user_Id: user
    }
    axios.post('/api/chat/createRoom',room_data)
    .then(response=>{
      if(response.data.success){
        alert("방 생성을 완료했습니다.");
        window.location.replace("/");
      }else{
        alert("채팅방을 만드는데 문제가 발생했습니다");
      }
    })
  }

  useEffect(()=>{
    dispatch(auth()).then(response=>{
      setuser(response.payload._id)
    })
    
    let data = {
      userId: user
    };
    
    dispatch(getRooms(data)).then(response=>{
      if(response.payload.success){
        setrooms(response.payload.rooms)
      }
    })
    

  },[user])

  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    {/* <Menu.Item key="chat">
      <a href="/chat">Chat</a>
    </Menu.Item> */}
    <SubMenu title={<span>Chat</span>}>
      <MenuItemGroup title="Start Chat">
        <Menu.Item key="setting:1"><a onClick={Create_Room}>Create_Channel</a></Menu.Item>
        {Chat_Rooms}
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu