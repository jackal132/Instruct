import { useEffect, useState } from 'react';
import '../css/Room.css';
import ChatWindow from './ChatWindow';
import ParticipantWrap from './ParticipantWrap';
import WriteWrap from './WriteWrap';
import io from 'socket.io-client';
import { Redirect } from 'react-router';

let socket;
const username = window.sessionStorage.getItem('username');

const Room = ({match}) => {
    
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [flag, setFlag] = useState(false);
    const [users, setUsers] = useState('');
    const roomId = match.params.roomId;

    useEffect(() => {
        socket = io('/');

        socket.emit('join', {username, roomId}, (err) => {
            if(err) {
                setFlag(true);
                alert(err);
            }
        })
    }, [roomId]);

    useEffect(() => {
        socket.on('message', chatMessage => {
            setChatMessages(chatMessages => [...chatMessages, chatMessage]);
        })

        socket.on('roomData', ({users}) => {
            setUsers(users);
        })
    },[]);

    const handleChange = (e) => {
        setChatMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(chatMessage){
            socket.emit('sendMessage', chatMessage, () => setChatMessage(''));
        }
    }

    if(flag) {
        return ( <Redirect to="/"/> )
    }

    return (
        <div className="main">
            <div className="bg">
                <div className="container">
                    <div className="mainTitle">Instruct</div>

                    <div className="roomContent">

                        <div className="chatWrap">
                            
                            <ChatWindow chatMessages={chatMessages}/>

                        </div>

                        <ParticipantWrap users={users}/>
                    </div>

                    <WriteWrap handleChange={handleChange} handleSubmit={handleSubmit} chatMessage={chatMessage}/>
                </div>
                <div className="closeBtn"></div>
            </div>
        </div>
    );
}

export default Room;