import '../css/RoomMain.css';
import RoomItem from './RoomItem';
const RoomList = (props) => {
    const { roomInfo } = props;
    
    // 맵에 항목들이 추가될때 key 필수임 
    const listItems = roomInfo.map((room, index) =>
        <RoomItem room={room} key={index}/>
    );

    return (
        <ul className="roomUl">
            { (roomInfo.length === 0) ? (
                <li className="roomLi">
                    <div className="roomInfo">
                        <div className="room">
                            <div className="roomTitle">
                                <p>개설된 방이 없습니다.</p>
                            </div>
                        </div>
                    </div>
                </li>
                ) : listItems }
        </ul>
    );
};

export default RoomList;