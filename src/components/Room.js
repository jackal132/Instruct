import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/Room.css';
import ChatWindow from './ChatWindow';
import ParticipantWrap from './ParticipantWrap';
import WriteWrap from './WriteWrap';
import YoutubeList from './YoutubeList';

let socket;

const Room = ({match}) => {
    const username = window.sessionStorage.getItem('username');
    const _id = window.sessionStorage.getItem('_id');
    const apiKey = process.env.REACT_APP_YOUTUBEAPI_KEY;
    const roomId = match.params.roomId;
    
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [flag, setFlag] = useState(false);
    const [users, setUsers] = useState('');
    const [visibility, setVisibility] = useState(false);
    const [youtubeSearchData, setYoutubeSearchData] = useState([]);

    let history = useHistory();
    

    useEffect(() => {
        socket = io('/');

        socket.emit('join', {_id, username, roomId}, (err) => {
            if(err) {
                setFlag(true);
                alert(err);
            }
        })
    }, [roomId, username, _id]);

    useEffect(() => {
        socket.on('message', chatMessage => {
            setChatMessages(chatMessages => [...chatMessages, chatMessage]);
        })

        socket.on('roomData', ({users}) => {
            setUsers(users);
        })
    },[]);

    if(flag) {
        return <Redirect to="/"/>;
    }

    const handleChange = (e) => {
        setChatMessage(e.target.value);
    }

    // 채팅 전송 버튼 클릭
    const handleSubmit = (e) => {
        e.preventDefault();

        if(chatMessage){
            socket.emit('sendMessage', chatMessage, () => setChatMessage(''));
        }
    }

    // 닫기 버튼 클릭
    const onClickCloseBtn = () => {
        socket.close();
        history.push('/room');
    }

    // 모달 오픈
	const openModal = async () => {
		setVisibility(true);
	}

	// 모달 클로즈
	const closeModal = async () => {
		setVisibility(false);
        setYoutubeSearchData([]);
	}

    const handleMessage = async (e) => {
        let query = e.target.innerText;
        if(query){
            await axios.get(`https://www.googleapis.com/youtube/v3/search?part=id,snippet&key=${apiKey}&q=${query}&maxResults=5&type=video&videoEmbeddable=true`)
                    .then(res => {
                        let data = res.data.items;
                        
                        for(let index = 0; index < data.length; index++){
                            let item = data[index];
                            let itemData = {
                                itemIndex : index,
                                videoId : item.id.videoId,
                                thumbnail : item.snippet.thumbnails.high,
                                channelTitle : item.snippet.channelTitle,
                                description : item.snippet.description
                            };
                            
                            setYoutubeSearchData(youtubeSearchData => [...youtubeSearchData, itemData]);
                            openModal();
                        }

                    })
                    .catch(err => console.log(err));
        }
    }

    return (
        <div className="main">
            <div className="bg">
                <div className="container">
                    <div className="mainTitle">Instruct</div>

                    <div className="roomContent">

                        <div className="chatWrap">
                            
                            <ChatWindow chatMessages={chatMessages} handleMessage={handleMessage}/>

                        </div>

                        <ParticipantWrap users={users}/>
                    </div>

                    <WriteWrap handleChange={handleChange} handleSubmit={handleSubmit} chatMessage={chatMessage}/>
                </div>
                
                <div className="closeBtn" onClick={onClickCloseBtn}/>

                <YoutubeList youtubeSearchData={youtubeSearchData} visible={visibility} close={closeModal}/>
            </div>
        </div>
    );
}

export default Room;