import axios from 'axios';
import { useEffect, useState } from 'react';
import '../css/RoomMain.css';
import RoomList from "./RoomList";
import RoomModal from "./RoomModal";

const RoomMain = () => {

	const username = window.sessionStorage.getItem('username');
	const [ rommInfo, setRoomIfo ] = useState([]);
	const [ visibility, setVisibility] = useState(false);

	useEffect(() => {
		getRoomList();
	},[rommInfo]);

	// 방 목록 조회
	const getRoomList = async () => {
		await axios.get('/room')
				.then(res => {
					setRoomIfo(res.data);
				});
	};

	// 모달 오픈
	const openModal = () => {
		setVisibility(true);
	}

	// 모달 클로즈
	const closeModal = () => {
		setVisibility(false);
	}

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
								<div className="creactBtn" onClick={openModal}/>
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
			<RoomModal visible={visibility} close={closeModal}/>
		</div>
    );    
}

export default RoomMain;
