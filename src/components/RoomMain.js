import axios from 'axios';
import { useEffect, useState } from 'react';
import '../css/RoomMain.css';
import RoomList from "./RoomList";

const RoomMain = () => {

	const username = window.sessionStorage.getItem('username');
	const [ rommInfo, setRoomIfo ] = useState([]);

	useEffect(() => {
		getRoomList();
	},[rommInfo]);

	const getRoomList = async () => {
		await axios.get('/room')
				.then(res => {
					setRoomIfo(res.data);
				});
	};

    return (
        <div className="main">
		<div className="bg">
			<div className="container">
				{/* <!-- Title --> */}
				<div className="mainTitle">Instruct</div>
				
				{/* <!-- 로그인 회원 정보 --> */}
				<div className="memberInfo">
					<div className="memberName">{username}</div>
					<div className="history"></div>
				</div>

				{/* <!-- 내용 --> */}
				<div className="content">
					<div className="contentLayout">
						<div className="createArea">
							<div className="creactBtn"></div>
						</div>

						{/* <!-- 방목록 --> */}
						<div className="roomListArea">
							<div className="roomList">

								<RoomList roomInfo={rommInfo}/>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    );    
}

export default RoomMain;
