import '../css/RoomMain.css';
const RoomItem = (props) => {

    const { room } = props;
    
    return (
        <li className="roomLi">
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