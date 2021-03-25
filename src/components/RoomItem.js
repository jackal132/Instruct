import '../css/RoomMain.css';
import { useHistory } from 'react-router-dom';
const RoomItem = (props) => {

    const { room } = props;
    let history = useHistory();

    const onClickRoom = () =>{
        history.push(`/room/${room._id}`);
    }
    
    return (
        <li className="roomLi" onClick={onClickRoom}>
            <div className="roomInfo">
                <div className="room">
                    <div className="roomTitle">
                        <p>{room.title}</p>
                    </div>
                    <div className="countInfo">
                        <div className="userIcon"></div>
                        <div className="headCount">{room.participantCnt}</div>
                    </div>
                </div>
                <div className="createDt">{room.createDt}</div>
            </div>
        </li>
    );
};

export default RoomItem;