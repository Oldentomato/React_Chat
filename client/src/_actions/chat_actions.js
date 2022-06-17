import axios from 'axios';
import {
    GET_CHATS,
    AFTER_POST_MESSAGE,
    GET_ROOMS
} from './types';
import { CHAT_SERVER } from '../components/Config.js';

export function getChats(){
    const request = axios.get(`${CHAT_SERVER}/getChats`)
        .then(response => response.data);
    
    return {
        type: GET_CHATS,
        payload: request
    }
}

export function getRooms(data){
    const request = axios.post(`${CHAT_SERVER}/getRooms`,data)
    .then(response=>response.data)
    return{
        type: GET_ROOMS,
        payload: request
    }
}

export function afterPostMessage(data){
    return{
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}


