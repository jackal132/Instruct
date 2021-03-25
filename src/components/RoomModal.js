import axios from 'axios';
import { useState } from 'react';
import '../css/RoomMain.css';
import closeImg from '../img/close.png';
import { useHistory } from 'react-router-dom';

const RoomModal = (props) => {
    
    const { visible, close } = props;
    const [ roomTitle, setRoomTitle ] = useState('');

    let history = useHistory();

    const handleClose = async () => {
        setRoomTitle('');
        
        // 도큐먼트 내에 모든 input을 조회하여 초기화
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = '')
        );

        close();
    }

    const handleChange = (e) => {
        setRoomTitle(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            roomTitle : roomTitle,
            createId : window.sessionStorage.getItem('_id')
        }

        await axios.post('/room', data)
                .then(res => {
                    console.log(res.data.message, res.data.roomId);

                    if(res.data.roomId === ''){
                        alert(res.data.message);
                    } else {
                        history.push(`/room/${res.data.roomId}`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });         
    }

    return (
        <div className="modalOverlay" style={{display : visible === true ? 'block' : 'none'}}>
            <div className="modalWrapper">
                <div className="modalInner">
                    <div className="modalClose">
                       <img className="closeImg" src={closeImg} alt="closeImg" onClick={handleClose}/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modalInputWrapper">
                            <input type="text" className="modalInput" name="roomTitle" onChange={handleChange} vlaue={roomTitle}/>
                            <button type="submit" className="modalBtn">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ); 
}

export default RoomModal;